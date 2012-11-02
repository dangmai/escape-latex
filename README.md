escape-latex
============

[![Build Status](https://travis-ci.org/dangmai/escape-latex.png)](https://travis-ci.org/dangmai/escape-latex)

Escape LaTeX special characters with Javascript in NodeJS environment.

Usage
-----

```javascript
npm install escape-latex
var lescape = require('escape-latex');
lescape("String to be escaped here #yolo");
```

Testing
-------

```
npm test
```

or

```
mocha -u tdd
```