import { rmSync } from 'fs'

export const METASCHEMAS_DATABASE = (await import('./metaschemas.json')).default
export const SCHEMAS_DIR = "./schemas"
export const DECLARATIONS_FILE = "./src/declarations.d.ts"

/**
 * A list of files that this script generates.
 * Used to check if all needed files are covered
 * and if all files are cleaned up in case of an error.
 *
 * _NOTE:_ Fetched schema files are not here.
 */
export const GENERATED_FILES = [
  SCHEMAS_DIR,
  DECLARATIONS_FILE,
] as const

export function rmDirs() {
  for (let file of GENERATED_FILES) rmSync(file, { recursive: true, force: true })
}

export function abort(e:Error) {
  rmDirs()
  console.error('🔴 Aborting:\n\n', e)
}
