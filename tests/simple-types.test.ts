import type { SimpleTypes } from "./../index"

let test1: SimpleTypes<"draft-00"> = "integer";
let test2: SimpleTypes<"draft-07"> = "integer";
let test3: SimpleTypes<"2020-12"> = "integer";

/**
 * Works with $id too.
 */
let test4: SimpleTypes<"http://json-schema.org/draft-04/schema#"> = "integer";
