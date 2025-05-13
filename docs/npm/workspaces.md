# A Beginner's Guide to npm Workspaces

Managing multiple packages in a single project can quickly become messy—especially in monorepos. That's where **npm workspaces** come in.

npm workspaces are a built-in feature that let you manage multiple packages (or projects) under a single top-level `package.json`. They help you keep everything organized and make dependency management easier across projects.

In this guide, we’ll walk through what workspaces are, why you might use them, and how to set them up and use them effectively.

---

## What Are npm Workspaces?

**npm workspaces** let you:

* Organize multiple packages inside one repository (a monorepo)
* Install all dependencies with a single `npm install`
* Link packages together without needing a registry (like npm or GitHub)
* Share dependencies across packages

Think of it as a way to treat multiple packages like a single project, while still giving each one its own `package.json`.

---

## Why Use Workspaces?

Workspaces are useful when you:

* Build **modular applications**, like a frontend, backend, and shared utilities
* Maintain **design systems or component libraries**
* Manage **plugins or extensions** in a larger platform
* Want **faster installs** and simpler linking for local packages

---

## Setting Up npm Workspaces

Workspaces require **npm v7 or later**. You can check your version with:

```
npm -v
```

### Step 1: Create a Monorepo Folder

```bash
mkdir my-monorepo
cd my-monorepo
npm init -y
```

Now you have your root project.

---

### Step 2: Define Workspaces in `package.json`

Edit your root `package.json` to include a `"workspaces"` field:

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["packages/*"]
}
```

> Setting `"private": true` is required to prevent accidental publishing of your monorepo root.

---

### Step 3: Create Some Packages

Now create two example packages inside a `packages` folder:

```bash
mkdir -p packages/utils
mkdir -p packages/app

cd packages/utils
npm init -y

cd ../app
npm init -y
```

Now you have:

```
my-monorepo/
├── package.json
└── packages/
    ├── utils/
    │   └── package.json
    └── app/
        └── package.json
```

---

### Step 4: Install Dependencies and Link Packages

Go back to the root and run:

```bash
npm install
```

This installs all dependencies across all workspaces and links them if one depends on the other.

For example, if `app` depends on `utils`, just add it like this in `packages/app/package.json`:

```json
"dependencies": {
  "utils": "1.0.0"
}
```

npm will **automatically link** the local `utils` package into `app`.

---

## Useful Commands with Workspaces

### Install in a Specific Workspace

To install a dependency in one workspace only:

```bash
npm install lodash --workspace=utils
```

### Run Scripts in a Specific Workspace

If each package has its own `package.json` scripts, you can run them like this:

```bash
npm run build --workspace=app
```

### Run Scripts Across All Workspaces

To run the same script in all workspaces:

```bash
npm run build --workspaces
```

Or for selective execution:

```bash
npm run test --workspaces --if-present
```

---

## Real-World Use Cases

* **Frontend + Backend in One Repo**: You might have `packages/web` and `packages/api`.
* **Shared Libraries**: You could extract common utilities into `packages/common`.
* **Design Systems**: Components, styles, and themes can live in their own workspace folders.
* **Microservices**: Each service can be a workspace with isolated dependencies.

---

## Summary

| Feature                        | Benefit                                   |
| ------------------------------ | ----------------------------------------- |
| Centralized dependency install | Faster installs, less duplication         |
| Local linking                  | No need for npm publish or symlinks       |
| Scoped installs/scripts        | Easy to isolate or group actions          |
| Easy project structure         | Cleaner and more scalable than many repos |

---

## Final Thoughts

npm workspaces are a powerful tool for managing multi-package projects in a scalable and maintainable way. Whether you're building a simple web app with a shared utility library, or managing dozens of services in a monorepo, workspaces help you keep things clean, efficient, and developer-friendly.

Want to dive deeper into monorepo tools like Turborepo or compare npm workspaces with Yarn or pnpm? Let me know, and I can cover that next.
