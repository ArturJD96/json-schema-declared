/**
 * This script downloads JSON Schemas specified in `metaschemas.json`
 * and builds `declarations.d.ts` file with Typescript declarations.
 */

import { rmDirs } from "./utils";
import { downloadMetaschemas } from "./metaschemas";
import { createDeclarationFiles } from "./declarations";

rmDirs()
await downloadMetaschemas()
createDeclarationFiles()
