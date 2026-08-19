# Build

The scripts here allow for declaring JSON Schemas as Typescript constants.

The file `metaschemas.json` serves as a source of truth containing links to available JSON Schema metaschemas.

> [!Note]
> Some of those scripts will deprecate if Typescript allows for reading JSON as constants, see [this Github proposal](https://github.com/microsoft/TypeScript/issues/32063) for more information.

# Buidling steps

> [!Tip]
> Refer to `build.ts` file for exact build steps.

Build steps automated by those scripts are:
1) Download all JSON Schema metaschemas mentioned in `metaschemas.json` together with their dependent schemas to `schemas` directory.
2) Create a `declarations.d.ts` containing metaschema's content as Typescript's `export declare const` types.
> [!Important]
> This step turns all Json Schema references into Typescript type references.

# Usage

The `declarations.d.ts` file serves as a Single Source of Truth (SSOT) for all the remaining types defined in this library.
