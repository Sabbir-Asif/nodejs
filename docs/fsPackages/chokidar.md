# Watching File Changes in Real-Time with `chokidar`

In many applications, especially development tools and build systems, it's essential to respond to file changes. This is where `chokidar` excels.

## What is `chokidar`?

`chokidar` is a fast and reliable file watcher for Node.js. It builds on Node's native `fs.watch` and `fs.watchFile`, adding support for recursive watching, exclusion patterns, and more consistent behavior across platforms.

## Installing `chokidar`

```bash
npm install chokidar
```

## Basic Example

```js
const chokidar = require('chokidar');

const watcher = chokidar.watch('src', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`));
```

## Advanced Watching Options

```js
chokidar.watch(['src/**/*.js', 'lib/**/*.ts'], {
  ignored: '**/*.test.js',
  persistent: true,
  usePolling: false,
  interval: 100,
  depth: 3
});
```

## Real-World Use Case: Auto Rebuild on Change

```js
const chokidar = require('chokidar');
const { exec } = require('child_process');

const watcher = chokidar.watch('src');

watcher.on('change', path => {
  console.log(`${path} changed. Rebuilding...`);
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Build failed: ${stderr}`);
    } else {
      console.log(`Build successful:\n${stdout}`);
    }
  });
});
```

This example enables live rebuilding of your project when source files change.

## Summary

`chokidar` provides an easy-to-use and efficient interface for watching file system changes. It’s widely adopted in developer tools and is ideal for building responsive workflows, automated rebuilders, or syncing file updates.
