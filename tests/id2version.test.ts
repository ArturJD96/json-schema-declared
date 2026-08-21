import { Id2Version } from "./../index"

let test1: Id2Version<"https://json-schema.org/draft/2020-12/schema"> = "2020-12"
let test2: Id2Version<"http://json-schema.org/draft-04/schema#"> = "draft-04"

// let test3: Id2Version<"https://json-schema.org/draft/2020-12/meta/core">; // error
