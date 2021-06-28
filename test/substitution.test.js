const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe("Substitution() tests by June", () => {
  it("should output a string, and ignore capital letters", () => {
    const actual = substitution("A", "xoyqmcgrukswaflnthdjpzibev");
    expect(actual).to.be.a("string");
    expect(actual).to.equal("x");
  });
  it("should return false if inputted alphabet is not a string of exactly 26 unique characters", () => {
    const actual1 = substitution("a", "b");
    const actual2 = substitution("a", "xoyqxcgrukswaflnthdjpzibev");
    const actual3 = substitution("a", "xoyqmcgrukswaflnthdjpzibev$");
    const actual4 = substitution("a", 4);
    expect(actual1).to.be.false;
    expect(actual2).to.be.false;
    expect(actual3).to.be.false;
    expect(actual4).to.be.false;
  });
  it("should be able to include special characters", () => {
    const actual = substitution("message", "$wae&zrdxtfcygvuhbijnokmpl");
    expect(actual).to.equal("y&ii$r&");
  });
  it("should maintain spaces", () => {
    const actual = substitution("mess age", "$wae&zrdxtfcygvuhbijnokmpl");
    expect(actual).to.equal("y&ii $r&");
  });
  it("should decode the with the same conditions", () => {
    const actual = substitution(
      "y&ii $r&",
      "$wae&zrdxtfcygvuhbijnokmpl",
      false
    );
    expect(actual).to.equal("mess age");
  });
});
