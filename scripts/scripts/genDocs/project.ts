import { Project, type SourceFile } from "ts-morph";
import { joinPkg } from "../shared";
import path from "node:path";

export const project = new Project();

const resGlobs = (...paths: string[]) =>
	paths.map((path) => (path.startsWith("!") ? `!${joinPkg(path.slice(1))}` : joinPkg(path)));

const sourceFiles = project.addSourceFilesAtPaths(
	resGlobs("src/**/*.ts", "!src/**/index.ts", "!src/**/types.ts", "!src/**/_*"),
);

export const groupedSourceFiles = Object.entries(
	Object.groupBy(sourceFiles, (sf) => path.relative(joinPkg("src"), sf.getFilePath()).split(path.sep)[0]!),
) as [string, SourceFile[]][];

groupedSourceFiles.forEach(([, sourceFiles]) =>
	sourceFiles.sort((a, b) => {
		const aName = a.getBaseName();
		if (aName === "validation.ts") return -1;
		if (aName === "utils.ts") return 1;
		return 0;
	}),
);

