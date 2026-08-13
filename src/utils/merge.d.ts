type Merge<
  J extends JsonObject | JsonArray,
  U extends JsonObject = J extends unknown[] ? J[number] : J,
  K extends keyof U = keyof U
> = {

  // Shared keys.
  [P in K]: U[P] extends Leaf ? U[P] : U[P] extends JsonObject ? Merge<U[P]> : U[P];

} & {

  // Unique keys.
  [K in Exclude<KeysOfUnion<U>, keyof U>]: Extract<U, { [k in K]: any }>[K]

}
