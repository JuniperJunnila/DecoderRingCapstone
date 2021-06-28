const { expect } = require("chai");
const { caesar } = require("../src/caesar.js");

describe("Ceasar() tests by June", () => {
  it("should return a word shifted a la the caesar function", () => {
    let actual = caesar("thinkful", 3);
    let expected = "wklqnixo";
    expect(actual).equal(expected);
    let actual2 = caesar("thinkful", -3);
    let expected2 = "qefkhcri";
    expect(actual2).equal(expected2);
  });
  it("should decode if encode is false", () => {
    let actual = caesar("wklqnixo", 3, false);
    let expected = "thinkful";
    expect(actual).equal(expected);
  });
  it("should wrap around if it reaches the beginning or end of the alphabet", () => {
    const actual = caesar("this is a secret message", 8);
    const expected = "bpqa qa i amkzmb umaaiom";
    expect(actual).equal(expected);
    const actual2 = caesar("i did the thing correctly", -8);
    const expected2 = "a vav lzw lzafy ugjjwuldq";
    expect(actual2).equal(expected2);
  });
  it("should ignore non-alphabet characters", () => {
    const actual = caesar("this is a secret message!", 8);
    const expected = "bpqa qa i amkzmb umaaiom!";
    expect(actual).equal(expected);
  });
  it("should not be case sensitive", () => {
    const actual = caesar("Thinkful", 3);
    const expected = "wklqnixo";
    expect(actual).equal(expected);
  });
  it("should return false if shift value is negative or not present", () => {
    const actual = caesar("thinkful", 0);
    expect(actual).to.be.false;
  });
});
