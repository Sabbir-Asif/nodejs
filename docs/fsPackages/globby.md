# Simplify File Matching with `globby` in Node.js

When working with modern JavaScript tooling, matching and selecting groups of files is a routine task. `globby` is a modern alternative to `glob`, offering a Promise-based API, better pattern handling, and enhanced developer ergonomics.

## What is `globby`?

`globby` extends the power of `glob` with additional features like multiple patterns, native Promise support, and better ignore handling. It's perfect for modern Node.js codebases using `async/await`.

## Installing `globby`

```bash
npm install globby
```

## Basic Example

```js
const globby = require('globby');

(async () => {
  const files = await globby(['src/**/*.js']);
  console.log('Matched files:', files);
})();
```

## Using Multiple Patterns

You can match files while excluding certain patterns in a single call:

```js
const globby = require('globby');

(async () => {
  const files = await globby([
    'src/**/*.js',
    '!src/**/*.test.js',
  ]);
  console.log('Filtered JS files:', files);
})();
```

## Real-World Use Case: Collecting Files to Bundle

Suppose you're building a custom bundler. You can use `globby` to collect all entry files:

```js
const globby = require('globby');

async function getEntryFiles() {
  const entryFiles = await globby(['src/pages/**/*.js', '!**/__tests__/**']);
  return entryFiles;
}

getEntryFiles().then(files => console.log(files));
```

## Working with Git Ignore Files

`globby` can automatically respect your `.gitignore`:

```js
const files = await globby(['**/*.js'], {
  gitignore: true,
});
```

This makes it very useful for tooling developers who want to respect developer environments.

## Summary

`globby` makes file matching simpler, more powerful, and easier to integrate with modern JavaScript code. Use it when you need flexible, Promise-based file discovery in your projects.
