/**
 * Traverse JSON using URI from the top.
 *
 * _Note_: handle `#` elsewhere (see `Refer` type).
 */
type UriRef<
  S, // Json to be traversed..
  R extends string, // Reference string.
  P extends string[] = Split<R, '/'>,
  >
  = P extends [infer K, ...infer URI]
    ? (K extends keyof S
      ? UriRef<S[K], R, URI extends string[] ? URI : []>
      : never)
  : S


/**
 * Retrieve schema's ID.
 */
type Id<S extends MinimalJsonSchema> = S extends {"$id": infer ID } ? ID : S extends {"id": infer ID} ? ID : never


/**
 * Resolve Json Pointer reference to a JSON.
 *
 * 1) Is URI an external link? Treat it as ID and return metaschema.
 * 2) Is URI just `#`? Return schema.
 * 3) Is `#` in the middle? `a/b#/c/d` => `(# = Metaschemas[a/b])[ #/c/d ]`
 *    * Refer current or otherschema (if string before `#` is present) traversed.
 *    * Otherwise return other schema.
 *
 * TO DO: Make it generic; MetaschemaByID => _any_ SchemaByID...
 * TO DO!!!: actually, it needs spec as it's first arg: 'MinimalJsonSchema' is a mistake!
 */
// type Refer<S extends { "schema": MinimalJsonSchema }, URI extends string, Spec = Spec<S>> =
type Refer<S extends MinimalJsonSchema, URI extends string> =
  URI extends `${'ftp'|'http'|'https'}://${string}`
  ? MetaschemaByID<URI>
  : URI extends "#"
    ? S
    : URI extends `${infer A}#/${infer B}`
      ? A extends ""
        ? UriRef<S, B>
        : UriRef<MetaschemaByID<`${UriUp<Id<S>>}/${A}`>, B>
      : MetaschemaByID<`${UriUp<Id<S>>}/${URI}`>

// TO DO: tests!

// type Traverse<J extends Json, Spec = Spec<J>> =
//   J extends Record<JsonKey, unknown>
//   ? { [K in keyof J]: Traverse<J[K], Spec> }
//   : J extends unknown[]
//     ? { [K in keyof J]: Traverse<J[K], Spec> }
//     : J

// type Deref<J extends Json, Spec = JsonSpec<Id<J>>> =
type Deref<J extends Json, Schema extends MinimalJsonSchema = J> =
  J extends Record<JsonKey, unknown>
  ? J extends { "$ref": string }
    ? { [R in J["$ref"]]: Deref<Refer<Schema, R>> }[J["$ref"]]
      & { [K in keyof Omit<J, "$ref">]: Deref<J[K], Schema> }
    : { [K in keyof J]: Deref<J[K], Schema> }
  : J extends unknown[]
    ? { [K in keyof J]: Deref<J[K], Schema> }
    : J
/*
  Reference cases:
  1) as object value: (Draft07)
    "required":{"$ref":"#/definitions/stringArray"}
    => "stringArray": {"type":"array","items":{"type":"string"}, "uniqueItems":true,"default":[]}}

  2) as object complement in schema
     "key": { "$ref": string, "a": "b" }
     => "key": { ... } & { "a": "b" }

  1) { $ref: "..."}
  2) { $ref: "...", a:"a", c:"c"}
*/
