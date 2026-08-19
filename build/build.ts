import { rmDirs } from "./utils";
import { downloadMetaschemas } from "./metaschemas";
import { createDeclarationFiles } from "./declarations";

rmDirs()
await downloadMetaschemas()
createDeclarationFiles()
