import fs from "fs-extra";
import { Md } from "../Md";
import { joinDocs } from "../shared";
import { groupedSourceFiles } from "./project";
import { type SourceFile } from "ts-morph";
import { handleFunctions } from "./functions";
import { handleTypes } from "./types";
import { handleVars } from "./vars";

for (const [category, sourceFiles] of groupedSourceFiles) {
	const outFile = joinDocs("content", category + ".mdx");
	const output = new Md();

	output.appendLine("---").appendLine(`title: ${category}`).appendLine("---").newLine();

	for (const sourceFile of sourceFiles)
		output
			.appendLine(`## ${sourceFile.getBaseNameWithoutExtension()}`)
			.newLine()
			.append(genFileText(sourceFile));

	output.removeLine();

	fs.writeFileSync(outFile, output.text);
}

function genFileText(sourceFile: SourceFile): string {
	const output = new Md();

	handleFunctions(sourceFile, output);
	handleTypes(sourceFile, output);
	handleVars(sourceFile, output);

	return output.text;
}
