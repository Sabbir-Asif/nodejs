# Powerful File Handling in Node.js: `glob`, `globby`, `fs-extra`, and `chokidar`

When working on real-world Node.js projects, dealing with files and directories becomes a routine task. Whether you’re building a CLI, static site generator, or development toolchain, you’ll often need to read, copy, watch, or match files. While Node’s built-in `fs` module is good, it’s low-level. That’s where some powerful open-source packages come in:

> In this post, we’ll explore **`glob`**, **`globby`**, **`fs-extra`**, and **`chokidar`** — understand what they solve, their strengths, limitations, and when you should reach for them.

---

## `glob`: The Classic File Matcher

### What is it?

`glob` is a tiny library that matches files using Unix-style wildcards like `**/*.js`. It’s widely used for finding sets of files by pattern, especially in build tools and task runners.

### Use Cases

* Select all `.js` files in a folder and subfolders.
* Include/exclude specific patterns during builds.
* Tooling (e.g., Babel, ESLint config, Mocha test discovery).

### Strengths

* Stable and widely adopted.
* Very flexible glob pattern syntax.
* Works with large file structures.

### Limitations

* Only supports callback or event-based API (no native promises).
* Doesn’t support `ignore` patterns as easily as globby.

### Why Use It?

If you want raw control and don’t need promises, `glob` is a great starting point.

```js
const glob = require('glob');
glob('src/**/*.js', function (err, files) {
  console.log(files); // All JS files recursively inside src/
});
```

---

## `globby`: Modern Glob with Superpowers

### What is it?

`globby` builds on top of `glob`, but offers a **Promise-based API**, supports **multiple patterns**, and is generally easier to use in modern codebases.

### Use Cases

* More elegant and readable file matching.
* Used in modern CLI tools and build systems.
* Supports both include and ignore patterns.

### Strengths

* Promise support + `async/await` friendly.
* Built-in support for `ignore`.
* Cleaner code and better DX.

### Limitations

* Slightly heavier than plain `glob`.
* Built on top of glob, so inherits its low-level quirks.

### Why Use It?

Use `globby` for almost all modern JavaScript file matching needs. It's just easier.

```js
const globby = require('globby');
(async () => {
  const paths = await globby(['src/**/*.js', '!src/**/*.test.js']);
  console.log(paths); // All JS files except tests
})();
```

---

## `fs-extra`: File System with Extra Goodies

### What is it?

`fs-extra` is a drop-in replacement for Node’s native `fs` module — but with many added utilities like `copy()`, `remove()`, and `ensureDir()`.

### Use Cases

* Copy folders (like `cp -r`).
* Remove directories safely.
* Ensure a directory exists before writing.
* Read/write JSON files easily.

### Strengths

* Fully compatible with Node’s `fs`.
* Promises and callbacks supported.
* Tons of helper functions for common file operations.

### Limitations

* Not part of Node core, so an extra dependency.
* Some functions can be dangerous if misused (e.g. `remove()` deletes recursively).

### Why Use It?

If you’re tired of writing boilerplate for reading, copying, or deleting files, `fs-extra` will simplify your life drastically.

```js
const fs = require('fs-extra');

fs.copy('src', 'dist')
  .then(() => console.log('Copied!'))
  .catch(err => console.error(err));
```

---

## `chokidar`: Watching Files Like a Pro

### What is it?

`chokidar` is a highly efficient file watcher built on Node’s `fs.watch` and `fsevents` (on macOS). It’s used in tools like Webpack, Parcel, and Jest.

### Use Cases

* Watch files or directories for changes.
* Build live reload tools.
* React to file creation, deletion, or editing.

### Strengths

* Debounced and highly optimized watching.
* Cross-platform (works on Linux, macOS, Windows).
* Handles symlinks and deeply nested folders.

### Limitations

* Doesn’t process the file — just watches.
* Requires system-level support (`fsevents` is optional).

### Why Use It?

If you need to watch files for changes and trigger rebuilds, syncs, or notifications — `chokidar` is the gold standard.

```js
const chokidar = require('chokidar');

const watcher = chokidar.watch('src', {
  ignored: /node_modules/,
  persistent: true
});

watcher
  .on('add', path => console.log(`File added: ${path}`))
  .on('change', path => console.log(`File changed: ${path}`))
  .on('unlink', path => console.log(`File removed: ${path}`));
```

---

## Which One Should You Use?

| Task                      | Package    |
| ------------------------- | ---------- |
| Match files with patterns | `globby`   |
| Low-level file matching   | `glob`     |
| Copy, delete, write JSON  | `fs-extra` |
| Watch for file changes    | `chokidar` |

---

## Conclusion

These utilities save you from reinventing the wheel. Whether you need to **find**, **manipulate**, or **watch** files — `glob`, `globby`, `fs-extra`, and `chokidar` provide production-tested, developer-friendly tools to supercharge your file workflows.

Use them wisely — they’re battle-tested in the Node ecosystem and help you write cleaner, safer, and more powerful code.
