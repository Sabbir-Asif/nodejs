
# A Complete Guide to Running Scripts Using npm

If you've worked with Node.js projects, you've probably seen or used commands like:

```
npm start
npm test
```

These are powered by **npm scripts**—a super handy way to automate common tasks like starting a server, running tests, building code, and more.

In this post, we'll walk through what npm scripts are, how to use them, how to write your own, and some helpful tricks to make your development workflow easier.

---

## What Are npm Scripts?

npm scripts are custom commands you define inside your project's `package.json` file under the `"scripts"` section.

Here's a basic example:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Running tests...\""
  }
}
```

In this case:

* `npm start` will run `node server.js`
* `npm test` will print `Running tests...`

You can define **any name** you want for a script—not just `start` and `test`.

---

## How to Run npm Scripts

To run a script, use:

```
npm run <script-name>
```

For example:

```
npm run build
npm run dev
```

However, there are **two built-in exceptions** where you can skip `run`:

* `npm start`
* `npm test`

So you can just run:

```
npm start
```

instead of:

```
npm run start`
```

---

## Creating Your Own Scripts

Let’s say you want to:

* Start a dev server with `nodemon`
* Run a build command with `webpack`
* Lint your code with `eslint`

You can define them like this:

```json
"scripts": {
  "dev": "nodemon index.js",
  "build": "webpack --config webpack.config.js",
  "lint": "eslint ."
}
```

Now you can run:

```
npm run dev
npm run build
npm run lint
```

---

## Chaining Scripts

You can run multiple scripts one after the other using `&&`:

```json
"scripts": {
  "lint": "eslint .",
  "build": "webpack",
  "prepare": "npm run lint && npm run build"
}
```

Now:

```
npm run prepare
```

...will run both linting and building.

---

## Running Scripts with Arguments

You can pass arguments to your scripts like this:

```bash
npm run build -- --mode=production
```

Everything after the second `--` is passed to your script.

---

## Pre and Post Hooks

npm supports `pre` and `post` hooks automatically. For any script named `xyz`, you can also define:

* `prexyz`: runs **before** `xyz`
* `postxyz`: runs **after** `xyz`

Example:

```json
"scripts": {
  "prebuild": "echo Preparing...",
  "build": "webpack",
  "postbuild": "echo Done building!"
}
```

When you run `npm run build`, it will execute all three in order:

1. `prebuild`
2. `build`
3. `postbuild`

---

## Script Shortcuts

If you're writing lots of scripts, it helps to use shortcut aliases or organize commands better.

### Example with reusable shell scripts:

```json
"scripts": {
  "clean": "rm -rf dist",
  "compile": "tsc",
  "rebuild": "npm run clean && npm run compile"
}
```

---

## View All Available Scripts

To list all the scripts in a project, run:

```
npm run
```

This will show all available scripts defined in your `package.json`.

---

## Final Tips

* Scripts can call any CLI tool installed locally or globally
* Local packages in `node_modules/.bin` are automatically in your path
* Keep scripts clear and consistent for your team

---

## Conclusion

npm scripts are one of the most powerful and flexible features of working in a Node.js environment. Whether you're automating builds, tests, formatting, or deployment, scripts let you keep everything in one place—your `package.json`.

They’re easy to use, easy to customize, and help make your project workflow faster and cleaner.

If you'd like a follow-up on using tools like `concurrently` or automating cross-platform scripts, let me know!
