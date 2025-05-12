# Modules in Node

## Common Js

This is the default module system for node js. Here each .js file is considered as a module.  
For example
```shell
- Animal.js
- Flower.js
```
Here, Animal is a module and Flower is another module.

## window vs global

We know, node js is a runtime for javascript. It allows us to write server side code in javascript and run it outside the browser.  
So, as we are not running the code in the browser we can not access the `window` object.  
In nodeJs the object that works in the top level global scope is called `global`.  

In javascript the top level scope is window/global scoped.  
For example if we declare a variable 
```js
var a = 1;
console.log(window);
console.log(window.a);   //1
```
This will print the window object and the variable `a` will be a property of the window object.

<figure>
  <img src="../assets/modules/window-var-a.png" alt="window object" width="500"/>
  <figcaption>Fig 01: window object having a var variable</figcaption>
</figure>

But in nodeJs if we declare a variable
```js 
var a = 1;
console.log(global.a);   //undefined
```

This will happen because nodeJs is by default a module system. Where each file is considered as a module.
So, the variable `a` is not a property of the global object, and we can not access it using `global.a`.
To access the variable `a` we need to attach it to the global object.
```js
global.a = 1;
console.log(global.a);   //1
```