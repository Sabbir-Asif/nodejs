# Mastering File Pattern Matching with `glob` in Node.js

When building Node.js tools, scripts, or automation workflows, you often need to find files by pattern — for example, all `.js` files in a `src` directory. This is where `glob` comes in.

## What is `glob`?

`glob` is a Node.js module that allows you to match files using Unix-style wildcards. It's commonly used in build systems, linters, testing frameworks, and anywhere you need to select a group of files dynamically.

## Installing `glob`

```bash
npm install glob
```

## Basic Example

```js
const glob = require('glob');

glob('src/**/*.js', function (err, files) {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('All JS files:', files);
});
```

This example recursively finds all `.js` files in the `src` folder.

## Using Glob Patterns

### Match all `.js` files in a folder

```js
glob('src/*.js', callback);
```

### Match files recursively in subfolders

```js
glob('src/**/*.js', callback);
```

### Match multiple types of files

```js
glob('src/**/*.{js,json}', callback);
```

### Exclude certain files using negation

```js
const pattern = 'src/**/*.js';
const ignore = 'src/**/*.test.js';

glob(pattern, { ignore: ignore }, function (err, files) {
  console.log('All non-test JS files:', files);
});
```

## Real-World Use Case: Building a File Linter

Imagine you're building a custom linter that should scan only `.js` files:

```js
const glob = require('glob');
const fs = require('fs');

function lintFiles() {
  glob('src/**/*.js', function (err, files) {
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('var ')) {
        console.warn(`${file}: Avoid using 'var'. Use 'let' or 'const'.`);
      }
    });
  });
}

lintFiles();
```

`glob` makes it easy to scale this tool to a whole codebase without manually listing files.

## Summary

`glob` is a flexible and powerful utility for pattern-based file selection in Node.js. It's particularly useful in custom tooling, build scripts, or anywhere you need to dynamically find files.
