# Understanding `process`, `process.env`, and Environment Variables in Node.js

Environment variables are essential when building real-world Node.js applications. They help you separate configuration from code—such as API keys, database credentials, or environment-specific settings. In this blog, we’ll walk through the concept of `process`, `process.env`, how you can use environment variables without any library, and then introduce the `dotenv` package.

---

## The `process` Object in Node.js

Node.js provides a global object called `process`. This object gives you access to information about the current Node.js process and lets you control its behavior.

### Some common uses of `process`:

* `process.argv` – Access command-line arguments.
* `process.exit()` – Exit the process.
* `process.cwd()` – Get the current working directory.
* `process.env` – Access environment variables.

---

## Using `process.env`

The `process.env` object is a key-value store where each key and value is a string. This is how Node exposes environment variables to your application.

### Example:

```js
console.log(process.env.NODE_ENV); // 'development', 'production', etc.
console.log(process.env.DB_PASSWORD); // your database password
```

You can set environment variables from the shell before running your application:

### On Unix/Linux/macOS:

```bash
NODE_ENV=production DB_PASSWORD=secret123 node app.js
```

### On Windows (Command Prompt):

```cmd
set NODE_ENV=production
set DB_PASSWORD=secret123
node app.js
```

This way, your application can stay secure and flexible across environments (development, staging, production).

---

## What is the `dotenv` Package?

Manually setting environment variables every time can be tedious—especially for local development. This is where the `dotenv` package comes in.

`dotenv` loads variables from a `.env` file into `process.env`.

### Why use `dotenv`?

* Avoid setting environment variables manually every time.
* Keep environment-specific configuration in a file.
* Version control `.env.example`, not `.env`, to show expected variables.

### Installation:

```bash
npm install dotenv
```

### Usage:

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=admin
```

Then, in your application:

```js
require('dotenv').config();

console.log(process.env.PORT); // 3000
console.log(process.env.DB_USER); // admin
```

### Note:

* Only use `.env` files for development.
* Never commit sensitive `.env` files to version control.

---

## When Should You Use Environment Variables?

* Database configuration (host, user, password).
* API keys and tokens.
* Flags like `NODE_ENV` to change behavior.
* Port numbers, third-party URLs.

---

## Summary

* The `process` object in Node.js provides runtime process info.
* `process.env` is used to access environment variables.
* You can set variables from the shell without any package.
* The `dotenv` package makes managing local environment settings easy and automatic.

Environment variables allow your app to behave differently without changing source code—keeping your codebase clean, secure, and portable.

Use them wisely, and remember to treat your `.env` files with care.
