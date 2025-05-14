# Supercharge File System Tasks with `fs-extra`

Node.js provides the built-in `fs` module to work with the file system, but it can be verbose or lacking in certain higher-level operations. This is where `fs-extra` comes into play.

## What is `fs-extra`?

`fs-extra` extends Node's `fs` module with additional methods for reading, writing, copying, moving, and deleting files and directories. It offers both asynchronous and synchronous methods.

## Installing `fs-extra`

```bash
npm install fs-extra
```

## Basic Example: Copying a Directory

```js
const fs = require('fs-extra');

fs.copy('src', 'dist')
  .then(() => console.log('Files copied'))
  .catch(err => console.error(err));
```

## Ensuring a Directory Exists

```js
fs.ensureDir('logs')
  .then(() => console.log('Directory ready'))
  .catch(err => console.error(err));
```

## Reading and Writing JSON Files

```js
fs.writeJson('config.json', { name: 'my-app' })
  .then(() => fs.readJson('config.json'))
  .then(data => console.log('Config:', data));
```

## Real-World Use Case: Clean and Prepare Build Folder

```js
const fs = require('fs-extra');

async function prepareBuildFolder() {
  await fs.remove('dist');
  await fs.ensureDir('dist');
  await fs.copy('public', 'dist');
  console.log('Build folder prepared');
}

prepareBuildFolder();
```

## Summary

`fs-extra` is a powerful enhancement over the built-in `fs` module. It reduces boilerplate code and makes common tasks like copying directories or working with JSON files easier and safer. If your project involves file manipulation, `fs-extra` is an essential tool.
