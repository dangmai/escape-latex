var assert = require('chai').assert,
    escape = require('./index');

suite('escape-latex', function () {
    test('should escape # correctly', function () {
        assert.equal("Hashtag \\#yolo is all the rage these days \\#twitter",
            escape("Hashtag #yolo is all the rage these days #twitter"));
    });
    test('should escape $ correctly', function () {
        assert.equal("\\$2 is greater than \\$1",
            escape("$2 is greater than $1"));
    });
    test('should escape % correctly', function () {
        assert.equal("100\\% is 20\\% point greater than 80\\%",
            escape("100% is 20% point greater than 80%"));
    });
    test('should escape & correctly', function () {
        assert.equal("Me \\& you \\& a dog named Boo",
            escape("Me & you & a dog named Boo"));
    });
    test('should escape backlash correctly', function () {
        assert.equal("C:\\textbackslash{} is a good place to format",
            escape("C:\\ is a good place to format"));
    });
    test('should escape { correctly', function () {
        assert.equal("This \\{ does not have an matching bracket",
            escape("This { does not have an matching bracket"));
    });
    test('should escape } correctly', function () {
        assert.equal("There is no opening bracket for this \\}",
            escape("There is no opening bracket for this }"));
    });
    test('should escape ^ correctly', function () {
        assert.equal("2\\textasciicircum{}2\\textasciicircum{}2\\textasciicircum{}2 = 256",
            escape("2^2^2^2 = 256"));
    });
    test('should escape _ correctly', function () {
        assert.equal("\\_ is a shortcut to Underscore, e.g., \\_.each()",
            escape("_ is a shortcut to Underscore, e.g., _.each()"));
    });
    test('should escape ~ correctly', function () {
        assert.equal("pi \\textasciitilde{} 3.1416",
            escape("pi ~ 3.1416"));
    });
    test('composite test 1', function () {
        assert.equal("These \\{\\} should be escaped, as well as this \\textbackslash{} character",
            escape("These {} should be escaped, as well as this \\ character"));
    });
});