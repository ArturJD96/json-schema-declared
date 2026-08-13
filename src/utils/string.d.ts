/**
 * Split a `String` literal on a `Separator` string.
 *
 * @example Split<"some/uri/to/split", '/'> = ['some', 'uri', 'to', 'split']
 * @example Split<"nothing", '/'> = ['nothing']
 */
type Split<
  String extends string,
  Separator extends string
  >
  = String extends `${infer Head}${Separator}${infer Remainder}`
    ? Remainder extends ""
      ? [Head]
      : [Head, ...Split<Remainder, Separator>]
    : [String]


/**
 * Remove last element of an array.
 */
type DropLast<A extends string[]> = A extends [...infer E, any] ? E : []
/**
 * Retrieve last element of an array.
 */
type Pop<A extends string[]> = A extends [...any, infer L] ? L : ''

/**
 * Joins an array `A` of string with `Separator`.
 */
type Join<
  A extends string[],
  Separator extends string,
  D extends string[] = DropLast<A>
  >
  = `${D extends [] ? '' : `${Join<D, Separator>}${Separator}`}${Pop<A>}`

/**
  * Get to higher URI location.
  *
  * @example "my/uri/adress" => "my/uri"
  */
type UriUp<U extends string> = Join<DropLast<Split<U, "/">>, '/'>
// TO DO: test!
