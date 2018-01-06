escape-latex
============

[![Greenkeeper badge](https://badges.greenkeeper.io/dangmai/escape-latex.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/dangmai/escape-latex.png)](https://travis-ci.org/dangmai/escape-latex)

Escape LaTeX special characters with Javascript in NodeJS (>= 4.x) environment.

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