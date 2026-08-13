

type Test<A extends JsonObject[], B extends Merge<A> = Merge<A>> = B

type Test_Merge = {

  "Simple objects": Test<
    [
      {
        a: "A";
        b: "B";
        c: "C"
      }, {
        a: "1";
        b: "2";
        d: "D"
      },
    ],
    {
      a: "A" | "1",
      b: "B" | "2",
      c: "C",
      d: "D"
    }
  >

  "Complex objects (no arrays)": Test<[
    // Given...
    {
      p: {
        a: "A";
        b: "B";
        c: "C"
      },
      q: { a: "A", b: "B" },
      s: "1"
    }, {
      p: {
        a: "1";
        b: "2";
        d: "D"
      },
      r: { a: "1" },
      s: "2"
    }],
    // Expected:
    {
      p: {
        a: "A" | "1"
        b: "B" | "2"
        c: "C"
        d: "D"
      },
      q: { a: "A", b: "B" },
      r: { a: "1" },
      s: "1" | "2"
    }
  >

  "Arrays are not merged": Test<
    [{ a: ["A", "B"] }, { a: ["X", "Y"] }],
    { a: ["A", "B"] | ["X", "Y"] }
    /* ...so not like this: { a: ["A" | "X", "B" | "Y"] } */
  >,

  "Schema": Test<
    [{
      properties: {
        prop1: {
          some: "thing"
        }
      }
    }, {
      properties: {
        prop2: {
          other: "thingy"
        }
      }
    }],
    { properties: { prop1: { some: "thing" }, prop2: { other: "thingy" } } }
  >,

  "Union of three": Test<
    [{
      a: { b: "B" }
    }, {
      a: { b: "C", d: "D" },
      f: "F"
      }, {
      a: { d: "DD", x: "X"},
      f: { g: "G" }
    }
    ],
    {
      a: { b: "B" | "C", d: "D" | "DD", x: "X" },
      f: "F" | { g: "G" }
    }
  >
}

let Test_Merge: Test_Merge
