type Test_Split<T extends string, E extends Split<T, "/">> = E

type TestSuite_Split = {
  "Splits correctly.": Test_Split<
    "head/something/remainder",
    ["head", "something", "remainder"]
  >,
  "Empty directory": Test_Split<
    "head/",
    ["head"]
  >,
  "Nothing to split": Test_Split<
    "head",
    ["head"]
  >,
};
let TestSuite_Split: TestSuite_Split;

type Test_Join<T extends string[], E extends Join<T, "/">> = E

type TestSuite_Join = {
  "Joins correctly": Test_Join<
    ['1', '2', '3'],
    "1/2/3"
  >
}

let TestSuite_Join: TestSuite_Join
