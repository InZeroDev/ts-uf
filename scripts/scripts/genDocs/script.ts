import fs from "fs-extra";
import { Md } from "../Md";
import { joinDocs } from "../shared";
import { groupedSourceFiles } from "./project";
import { genFileText } from "./utils";

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
