import type { SourceFile } from "ts-morph";
import type { Md } from "../../Md";

export function handleVars(sourceFile: SourceFile, output: Md): void {
	const vars = sourceFile.getVariableDeclarations().filter((varDecl) => varDecl.isExported());

	if (vars.length) output.appendLine(`### VARIABLES`).newLine();

	for (const varDecl of vars) {
		const stmt = varDecl.getVariableStatementOrThrow();
		const text = stmt.getText();
		const jsDoc = stmt.getJsDocs().at(-1)?.getText();

		output.appendLine("```ts").appendLineIfDefined(jsDoc).appendLine(text).appendLine("```");
	}
}
