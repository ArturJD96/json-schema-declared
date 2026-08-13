import { rmSync } from 'fs'

/*
    Directories.
*/

export function rmDirs() {
  for (let file of GENERATED_FILES) rmSync(file, { recursive: true, force: true })
}

export function abort(e:Error) {
  rmDirs()
  console.error('🔴 Aborting:\n\n', e)
}

/*
    Schemas.
*/

// TO DO: remove it!
export function schema2var(name: MetaschemaVersion): string {
  return `METASCHEMA_${name.toUpperCase().replace(/\-|\//, '_')}`
}

export function schema2spec(name: MetaschemaVersion): string {
  const capitalized = name[0].toUpperCase() + name.slice(1)
  return `Spec${capitalized.replace('-', '')}`
}

export function array2literal(arr: (string | number)[]): string {
  return arr.map(s => typeof s === 'number' ? s : `"${s}"`).join(' | ')
}

export const METASCHEMAS_DATABASE = (await import('./metaschemas.json')).default
export const SCHEMAS_DIR = "./schemas"
export const DECLARATIONS_FILE = "./lib/declarations.ts"


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
  // './metaschemas.ts',
  // './specs.d.ts',
  // './json-schemas.d.ts'

] as const
