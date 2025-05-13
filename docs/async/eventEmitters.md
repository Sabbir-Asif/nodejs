
# A Guide to Event Emitters in Node.js

If you’ve been working with Node.js for a while, you’ve probably heard of or run into **Event Emitters**. They're one of the core building blocks behind Node's **event-driven architecture**.

In this post, we’ll go over:

* What Event Emitters are
* How to use them
* Why listener **ordering matters**
* Some best practices and gotchas

Let’s dive in.

---

## What Are Event Emitters?

In simple terms, \*\*Event Emitters are objects that can:

1. Emit named events
2. Listen for those events with callback functions ("listeners")\*\*

This is similar to how the browser works:

```js
document.addEventListener('click', () => {
  console.log('Clicked!');
});
```

In Node.js, we use the `EventEmitter` class from the `events` module to do something similar.

---

## Basic Example

```js
const EventEmitter = require('events');

const myEmitter = new EventEmitter();

// Add a listener
myEmitter.on('greet', () => {
  console.log('Hello there!');
});

// Emit the event
myEmitter.emit('greet'); // Hello there!
```

When you call `emit('greet')`, it triggers the listener attached to `'greet'`.

---

## Adding Multiple Listeners

```js
myEmitter.on('greet', () => {
  console.log('Listener 1');
});

myEmitter.on('greet', () => {
  console.log('Listener 2');
});

myEmitter.emit('greet');
```

**Output:**

```
Listener 1
Listener 2
```

Listeners are called **in the order they were registered**. That brings us to…

---

## Why Listener Order Matters

The **order in which you add listeners is the order they are executed**. This can be very important in real-world scenarios, like:

* Logging first, then performing logic
* Validating input before processing it
* Performing tasks in stages

If you accidentally change the order of registration, you might end up:

* Logging too late
* Running a handler before a validation has passed
* Triggering a race condition

Here’s an example of **why order matters**:

```js
const emitter = new EventEmitter();

emitter.on('save', () => {
  console.log('🔒 Saving to database');
});

emitter.on('save', () => {
  console.log('📤 Sending confirmation email');
});

emitter.emit('save');
```

Now imagine if these were flipped, and you sent the email **before** the data was saved—that could cause real-world issues.

---

## Using `once` for One-Time Listeners

```js
emitter.once('login', () => {
  console.log('This will only run once');
});

emitter.emit('login'); // runs
emitter.emit('login'); // doesn’t run
```

Great for things like:

* One-time setup
* First-time alerts
* Temporary features

---

## Removing Listeners

### Using `.off()` (Node 10+)

```js
function sayHi() {
  console.log('Hi!');
}

emitter.on('hi', sayHi);
emitter.off('hi', sayHi);
```

### Why remove listeners?

* Prevent memory leaks
* Avoid unexpected behavior
* Clean up after a module is done

---

## Event Arguments

You can pass data when emitting an event:

```js
emitter.on('user', (name) => {
  console.log(`User logged in: ${name}`);
});

emitter.emit('user', 'Alice'); // User logged in: Alice
```

---

## Handling Errors with `error` Event

If an `EventEmitter` emits an `'error'` event and no listener is attached to it, **Node.js will crash**.

```js
emitter.emit('error', new Error('Something went wrong')); // 💥 Crash!
```

**Solution:**

```js
emitter.on('error', (err) => {
  console.error('Caught error:', err.message);
});
```

---

## Max Listeners Warning

By default, Node warns if more than 10 listeners are added to a single event. This is to help detect potential memory leaks.

To change the limit:

```js
emitter.setMaxListeners(20);
```

---

## When to Use Event Emitters

Event Emitters are ideal when:

* You’re building custom modules that need to respond to events
* You’re dealing with async or decoupled flows
* You want a plugin-style architecture

They’re **not** ideal for all communication—don’t overuse them when a regular function call would do.

---

## Summary

Here’s a quick recap of what you’ve learned:

✅ Event Emitters let you emit and listen to custom events
✅ You can attach multiple listeners to the same event
✅ Listener **ordering matters** for correctness and predictability
✅ Use `.once()` for one-time events
✅ Always handle `'error'` events
✅ Clean up listeners to avoid memory leaks

---

Event Emitters are powerful, flexible, and everywhere in Node.js—from core modules like `http` and `fs` to frameworks like Express.

Once you get comfortable with them, you’ll unlock a new level of power in your Node.js apps.

Let me know if you'd like a follow-up post explaining how to build your own EventEmitter-like class from scratch.
