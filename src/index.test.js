import { describe, expect, test } from "vitest";

import escapeLatex from "./index.js";

describe("escape-latex", () => {
  test("should escape empty string correctly", () => {
    expect(escapeLatex("")).toBe("");
  });
  test("should escape casted string correctly", () => {
    expect(escapeLatex(1)).toBe("1");
  });
  test("should escape # correctly", () => {
    expect(
      escapeLatex("Hashtag #yolo is all the rage these days #twitter"),
    ).toBe("Hashtag \\#yolo is all the rage these days \\#twitter");
  });
  test("should escape $ correctly", () => {
    expect(escapeLatex("$2 is greater than $1")).toBe(
      "\\$2 is greater than \\$1",
    );
  });
  test("should escape % correctly", () => {
    expect(escapeLatex("100% is 20% point greater than 80%")).toBe(
      "100\\% is 20\\% point greater than 80\\%",
    );
  });
  test("should escape & correctly", () => {
    expect(escapeLatex("Me & you & a dog named Boo")).toBe(
      "Me \\& you \\& a dog named Boo",
    );
  });
  test("should escape backlash correctly", () => {
    expect(escapeLatex("C:\\ is a good place to format")).toBe(
      "C:\\textbackslash{} is a good place to format",
    );
  });
  test("should escape { correctly", () => {
    expect(escapeLatex("This { does not have an matching bracket")).toBe(
      "This \\{ does not have an matching bracket",
    );
  });
  test("should escape } correctly", () => {
    expect(escapeLatex("There is no opening bracket for this }")).toBe(
      "There is no opening bracket for this \\}",
    );
  });
  test("should escape ^ correctly", () => {
    expect(escapeLatex("2^2^2^2 = 256")).toBe(
      "2\\textasciicircum{}2\\textasciicircum{}2\\textasciicircum{}2 = 256",
    );
  });
  test("should escape _ correctly", () => {
    expect(escapeLatex("_ is a shortcut to Underscore, e.g., _.each()")).toBe(
      "\\_ is a shortcut to Underscore, e.g., \\_.each()",
    );
  });
  test("should escape ~ correctly", () => {
    expect(escapeLatex("pi ~ 3.1416")).toBe("pi \\textasciitilde{} 3.1416");
  });
  test("should escape *nix newline correctly", () => {
    expect(escapeLatex("\n\n", { preserveFormatting: true })).toBe(
      "\\newline{}\\newline{}",
    );
  });
  test("should escape Windows newline correctly", () => {
    expect(escapeLatex("\r\n\r\n", { preserveFormatting: true })).toBe(
      "\\newline{}\\newline{}",
    );
  });
  test("should escape mixed newlines correctly", () => {
    expect(escapeLatex("\r\n\n\n\r\n", { preserveFormatting: true })).toBe(
      "\\newline{}\\newline{}\\newline{}\\newline{}",
    );
  });
  test("should escape – (en-dash) correctly", () => {
    expect(escapeLatex("–", { preserveFormatting: true })).toBe("\\--");
  });
  test("should escape — (em-dash) correctly", () => {
    expect(escapeLatex("—", { preserveFormatting: true })).toBe("\\---");
  });
  test("should escape spaces correctly", () => {
    expect(
      escapeLatex("Look ma,  multiple spaces", { preserveFormatting: true }),
    ).toBe("Look~ma,~~multiple~spaces");
  });
  test("should escape tabs correctly", () => {
    expect(escapeLatex("\t\t", { preserveFormatting: true })).toBe(
      "\\qquad{}\\qquad{}",
    );
  });
  test("should not preserve formatting by default", () => {
    expect(escapeLatex("en dash – is cool")).toBe("en dash – is cool");
  });
  test("should not escape - (hyphen)", () => {
    expect(escapeLatex("hyphen - is the best")).toBe("hyphen - is the best");
  });
  test("should escape customized character correctly", () => {
    const escapeMapFn = (defaultEscapes, formatEscapes) =>
      Object.assign({}, defaultEscapes, formatEscapes, { a: "\\a{}" });
    expect(escapeLatex("a is the first letter", { escapeMapFn })).toBe(
      "\\a{} is the first letter",
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
    expect(escapeLatex(originalStr)).toBe(escapedStr);
  });
  test("composite test 1", () => {
    expect(
      escapeLatex("These {} should be escaped, as well as this \\ character"),
    ).toBe(
      "These \\{\\} should be escaped, as well as this \\textbackslash{} character",
    );
  });
});
