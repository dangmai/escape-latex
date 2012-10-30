/*jslint node:true*/
"use strict";

// Map the characters to escape to their escaped values. The list is derived
// from http://www.cespedes.org/blog/85/how-to-escape-latex-special-characters
var escapes = {
    '{': '\\{',
    '}': '\\}',
    '\\': '\\textbackslash{}',
    '#': '\\#',
    '$': '\\$',
    '%': '\\%',
    '&': '\\&',
    '^': '\\textasciicircum{}',
    '_': '\\_',
    '~': '\\textasciitilde{}'
},
    /**
     * Escape a string to be used in JS regular expression.
     * Code from http://stackoverflow.com/a/6969486
     * @param str the string to be used in a RegExp
     * @return the escaped string, ready to be used for RegExp
     */
    escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },
    escapeKeys = Object.keys(escapes), // as it is reused later on
    escapeKeyRegExps = escapeKeys.map(function (key) {
        return escapeRegExp(key);
    });

/**
 * Escape a string to be used in LaTeX documents.
 * @param str the string to be escaped.
 * @return the escaped string, ready to be used in LaTeX.
 */
function lescape(str) {
    var pos, match, regExp,
        regExpFound = false,
        result = str;
    // Algorithm: Find the character(s) to escape, then break the string up at
    // that/those character(s) and repeat the process recursively.
    // We can't just sequentially replace each character(s), because the result
    // of an earlier step might be escaped again by a later step.
    escapeKeys.forEach(function (key, index) {
        if (regExpFound) {
            // This is here to avoid breaking up strings unnecessarily: In every
            // repetition step, we only need to find ONE special character(s) to
            // break up the string; after it is done, there is no need to look
            // further.
            return;
        }
        pos = str.search(escapeKeyRegExps[index]);
        match = str.match(escapeKeyRegExps[index]);
        if (pos !== -1) {
            result = lescape(str.slice(0, pos)) + escapes[escapeKeys[index]] + lescape(str.slice(pos + match.length));
            regExpFound = true;
        }
    });
    // Found nothing else to escape
    return result;
}

module.exports = function (texString) {
    return lescape(String(texString));
};