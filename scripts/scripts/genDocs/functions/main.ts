import type { FunctionDeclaration, SourceFile } from "ts-morph";
import { Md } from "../../Md";
import { extractSettings } from "./settings";
import { extractFuncData } from "./utils";

export function handleFunctions(sourceFile: SourceFile, output: Md): void {
	const functions = sourceFile.getFunctions().filter((func) => func.isExported());

	for (const func of functions) {
		output.appendLine(`### ${func.getName()}`).newLine();

		const overloads = func.getOverloads();
		if (overloads.length) {
			output.appendLine(
				`<Tabs items={[${Array.from({ length: overloads.length }, (_, i) => `"Overload ${(i + 1).toString().padStart(2, "0")}"`).join(", ")}]}>`,
			);

			overloads.forEach((overload, index) =>
				output
					.appendLine(`<Tab value={"Overload ${(index + 1).toString().padStart(2, "0")}"}>`)
					.newLine()
					.append(genFuncText(overload))
					.appendLine("</Tab>"),
			);

			output.appendLine("</Tabs>");
		} else output.append(genFuncText(func));
	}
}

function genFuncText(func: FunctionDeclaration): string {
	const output = new Md();
	const settings = extractSettings(func);

	const data = extractFuncData(func, settings);

	if (settings?.before) output.appendLine(settings.before).newLine();

	output.appendLine(data.shape);

	if (data.description) output.appendLine(data.description).newLine();
	if (data.remarks) output.append(data.remarks).newLine();
	if (data.see) output.append(data.see).newLine();
	if (data.throws) output.append(data.throws).newLine();
	if (data.example) output.append(data.example).newLine();

	return output.text;
}
