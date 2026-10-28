import path from "node:path";
import {
	SourceFile,
	TypeAliasDeclaration,
	type FunctionDeclaration,
	type JSDoc,
	type Node,
} from "ts-morph";
import { project } from "../project";

export function extractSettings(func: FunctionDeclaration) {
	const settingsDoc = func
		.getJsDocs()
		.find((doc) => doc.getTags().some((tag) => tag.getTagName() === "settingsDoc"));

	if (!settingsDoc) return;

	const before = extractTag(settingsDoc, "before");
	const afterShape = extractTag(settingsDoc, "afterShape");

	return { before, afterShape };
}

export type Settings = ReturnType<typeof extractSettings>;

function extractTag(doc: JSDoc, tagName: string) {
	const sf = doc.getSourceFile();

	const tag = doc.getTags().find((tag) => tag.getTagName() === tagName);
	if (!tag) return;

	const tagText = tag.getCommentText();
	if (!tagText) return console.log(`Empty tag: ${getNodeCoords(tag)}`);

	return tagText.replace(/\$T{([^}]+)}(?:{([^}]+)})?/g, (_, name: string, modifier?: string) => {
		let type: TypeAliasDeclaration;

		if (modifier === undefined) type = getLocalType(name, sf);
		else if (modifier === "I") type = getTypeFromImport(name, sf);
		else if (/^\.\.?\//.test(modifier)) type = getTypeFromExternalFile(name, sf, modifier);
		else throw new Error(`Invalid modifier: ${modifier}`);

		return type.setIsExported(false).getText();
	});
}

function getTypeFromImport(name: string, sf: SourceFile) {
	const typeSf = sf
		.getImportDeclarations()
		.find((imp) => imp.getNamedImports().some((ni) => ni.getName() === name))
		?.getModuleSpecifierSourceFile();

	if (!typeSf) throw new Error(`Import not found: ${name}`);

	return typeSf.getTypeAliasOrThrow(name);
}

function getTypeFromExternalFile(name: string, sf: SourceFile, relativeFilePath: string) {
	const sfDir = sf.getDirectoryPath();
	const externalSf = project.getSourceFileOrThrow(path.join(sfDir, relativeFilePath));
	return externalSf.getTypeAliasOrThrow(name);
}

function getLocalType(name: string, sf: SourceFile) {
	return sf.getTypeAliasOrThrow(name);
}

function getNodeCoords(node: Node) {
	const sf = node.getSourceFile();
	const { line, column } = sf.getLineAndColumnAtPos(node.getStart());
	const relativePath = path.relative(process.cwd(), sf.getFilePath());
	return `${relativePath}:${line}:${column}`;
}
