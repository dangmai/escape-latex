const assert = require("chai").assert;
const escapeLatex = require("./index");

suite("escape-latex", () => {
  test("should escape empty string correctly", () => {
    assert.equal("", escapeLatex(""));
  });
  test("should escape casted string correctly", () => {
    assert.equal("1", escapeLatex(1));
  });
  test("should escape # correctly", () => {
    assert.equal(
      "Hashtag \\#yolo is all the rage these days \\#twitter",
      escapeLatex("Hashtag #yolo is all the rage these days #twitter"),
    );
  });
  test("should escape $ correctly", () => {
    assert.equal(
      "\\$2 is greater than \\$1",
      escapeLatex("$2 is greater than $1"),
    );
  });
  test("should escape % correctly", () => {
    assert.equal(
      "100\\% is 20\\% point greater than 80\\%",
      escapeLatex("100% is 20% point greater than 80%"),
    );
  });
  test("should escape & correctly", () => {
    assert.equal(
      "Me \\& you \\& a dog named Boo",
      escapeLatex("Me & you & a dog named Boo"),
    );
  });
  test("should escape backlash correctly", () => {
    assert.equal(
      "C:\\textbackslash{} is a good place to format",
      escapeLatex("C:\\ is a good place to format"),
    );
  });
  test("should escape { correctly", () => {
    assert.equal(
      "This \\{ does not have an matching bracket",
      escapeLatex("This { does not have an matching bracket"),
    );
  });
  test("should escape } correctly", () => {
    assert.equal(
      "There is no opening bracket for this \\}",
      escapeLatex("There is no opening bracket for this }"),
    );
  });
  test("should escape ^ correctly", () => {
    assert.equal(
      "2\\textasciicircum{}2\\textasciicircum{}2\\textasciicircum{}2 = 256",
      escapeLatex("2^2^2^2 = 256"),
    );
  });
  test("should escape _ correctly", () => {
    assert.equal(
      "\\_ is a shortcut to Underscore, e.g., \\_.each()",
      escapeLatex("_ is a shortcut to Underscore, e.g., _.each()"),
    );
  });
  test("should escape ~ correctly", () => {
    assert.equal("pi \\textasciitilde{} 3.1416", escapeLatex("pi ~ 3.1416"));
  });
  test("should escape *nix newline correctly", () => {
    assert.equal(
      "\\newline{}\\newline{}",
      escapeLatex("\n\n", { preserveFormatting: true }),
    );
  });
  test("should escape Windows newline correctly", () => {
    assert.equal(
      "\\newline{}\\newline{}",
      escapeLatex("\r\n\r\n", { preserveFormatting: true }),
    );
  });
  test("should escape mixed newlines correctly", () => {
    assert.equal(
      "\\newline{}\\newline{}\\newline{}\\newline{}",
      escapeLatex("\r\n\n\n\r\n", { preserveFormatting: true }),
    );
  });
  test("should escape – (en-dash) correctly", () => {
    assert.equal("\\--", escapeLatex("–", { preserveFormatting: true }));
  });
  test("should escape — (em-dash) correctly", () => {
    assert.equal("\\---", escapeLatex("—", { preserveFormatting: true }));
  });
  test("should escape spaces correctly", () => {
    assert.equal(
      "Look~ma,~~multiple~spaces",
      escapeLatex("Look ma,  multiple spaces", { preserveFormatting: true }),
    );
  });
  test("should escape tabs correctly", () => {
    assert.equal(
      "\\qquad{}\\qquad{}",
      escapeLatex("\t\t", { preserveFormatting: true }),
    );
  });
  test("should not preserve formatting by default", () => {
    assert.equal("en dash – is cool", escapeLatex("en dash – is cool"));
  });
  test("should not escape - (hyphen)", () => {
    assert.equal("hyphen - is the best", escapeLatex("hyphen - is the best"));
  });
  test("should escape customized character correctly", () => {
    const escapeMapFn = (defaultEscapes, formatEscapes) =>
      Object.assign({}, defaultEscapes, formatEscapes, { a: "\\a{}" });
    assert.equal(
      "\\a{} is the first letter",
      escapeLatex("a is the first letter", { escapeMapFn }),
    );
  });
  test("stack overflow test", () => {
    // The original algorithm of this library uses recursions to escape
    // the string, which is prone to stack overflow if the input string
    // contains a lot of characters that need to be escaped. This test
    // ensures that we won't run into it in the future.
    const numChars = 100000;
    const originalStr = Array(numChars).join("\\");
    const escapedStr = Array(numChars).join("\\textbackslash{}");
    assert.equal(escapedStr, escapeLatex(originalStr));
  });
  test("composite test 1", () => {
    assert.equal(
      "These \\{\\} should be escaped, as well as this \\textbackslash{} character",
      escapeLatex("These {} should be escaped, as well as this \\ character"),
    );
  });
});
