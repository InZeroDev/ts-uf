import type { FunctionDeclaration, JSDoc } from "ts-morph";
import type { Settings } from "./settings";
import { Md } from "../../Md";

export function extractFuncData(func: FunctionDeclaration, settings: Settings) {
	const docs = func.getJsDocs();

	const shape = extractFuncShape(func, settings);

	const doc = docs.at(-1);
	const description = extractDescription(doc);
	const example = extractExample(doc);
	const throws = extractThrows(doc);
	const remarks = extractNote(doc, "remarks");
	const see = extractNote(doc, "see");

	return { shape, description, example, throws, remarks, see };
}

function extractFuncShape(func: FunctionDeclaration, settings: Settings) {
	const text = func.getText();
	const body = func.getBody();
	const shape = (body ? text.slice(0, body.getStart() - func.getStart()) : text)
		.trim()
		.replace(/^export\s+/, "")
		.replace(/(?<!;)$/, ";");
	const source =
		func
			.getOverloads()
			.map((overload) => overload.getText())
			.join("\n") +
		"\n" +
		func.getImplementationOrThrow().getText();

	const md = new Md();

	md.appendLine("```ts tab='Shape'").appendLine(shape);

	if (settings?.afterShape) md.newLine().appendLine(settings.afterShape);

	md.appendLine("```")
		.newLine()
		.appendLine("```ts tab='Source'")
		.appendLine(source.trim())
		.appendLine("```");

	return md.text;
}

function extractDescription(doc: JSDoc | undefined) {
	const description = doc?.getCommentText()?.trim();
	if (!description) return;
	return convertJsDocLinks(description);
}

function extractExample(doc: JSDoc | undefined) {
	const tags = doc?.getTags();
	const example = tags
		?.find((tag) => tag.getTagName() === "example")
		?.getCommentText()
		?.replace(/^(\s{2})+/gm, (m) => "\t".repeat(m.length / 2));
	if (!example) return;

	return new Md().appendLine("```ts title='Example'").appendLine(example).appendLine("```").text;
}

function extractThrows(doc: JSDoc | undefined) {
	const tags = doc?.getTags();
	const throws = tags?.find((tag) => tag.getTagName() === "throws")?.getCommentText();
	if (!throws) return;

	return new Md()
		.appendLine("<Callout type='warn'>")
		.newLine()
		.appendLine(convertJsDocLinks(throws))
		.newLine()
		.appendLine("</Callout>").text;
}

function extractNote(doc: JSDoc | undefined, tagName: "remarks" | "see") {
	const tags = doc?.getTags();
	let note = tags?.find((tag) => tag.getTagName() === tagName)?.getCommentText();
	if (!note) return;

	note = convertJsDocLinks(note);

	return new Md()
		.appendLine("<Callout type='info'>")
		.newLine()
		.append(tagName === "see" ? "See " : "")
		.appendLine(note)
		.newLine()
		.appendLine("</Callout>").text;
}

/* -------------------------------------------------------------------------- */

function convertJsDocLinks(text: string) {
	const regex = /{@(?:link(?:code)?)\s+([^}|]+)(?:\s*\|\s*([^}]+))?}/g;
	return text.replace(regex, (_, link: string, placeholder?: string) => {
		if (link in externalLinks)
			return `[${placeholder ?? link}](${externalLinks[link as keyof typeof externalLinks]})`;
		else return `[${placeholder ?? link}](#${link.toLowerCase()})`;
	});
}

const externalLinks = {
	RangeError:
		"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError",
};