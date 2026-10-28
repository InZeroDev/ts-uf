import { SyntaxKind, type SourceFile } from "ts-morph";
import { Md } from "../../Md";

export function handleTypes(sourceFile: SourceFile, output: Md) {
	const types = sourceFile.getTypeAliases().filter((type) => type.isExported());
	if (types.length === 0) return;

	output.appendLine(`### TYPES`).newLine();

	for (const type of types) {
		const params = type.getTypeParameters();
		const jsDoc = type.getJsDocs().at(-1)?.getText();

		if (params.length === 0) {
			output
				.appendLine("```ts")
				.appendLineIfDefined(jsDoc)
				.appendLine(type.getText().trim())
				.appendLine("```")
				.newLine();
			continue;
		}

		const source = type.getText();
		const shape = source
			.slice(
				0,
				type.getFirstChildByKindOrThrow(SyntaxKind.EqualsToken).getStart() - type.getStart(),
			)
			.replace(/^export\s+/, "");

		output
			.appendLine("```ts tab='Shape'")
			.appendLineIfDefined(jsDoc)
			.appendLine(shape.trim())
			.appendLine("```")

			.newLine()

			.appendLine("```ts tab='Source'")
			.appendLineIfDefined(jsDoc)
			.appendLine(source.trim())
			.appendLine("```")
			.newLine();
	}
}
