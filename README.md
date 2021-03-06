# DOMPLATES

Library to handle `<template>` elements. Html templates is a method supported by all modern browsers that is faster than any other template system because it works with parsed html elements instead strings. [Here's more info](https://www.html5rocks.com/en/tutorials/webcomponents/template/)

Note: [It's not supported by explorer](http://caniuse.com/#feat=template)

* Fast
* Light (3Kb uncomprised)
* Compatible with CommonJS, AMD and global javascript

## Install

Download the package using npm, yarn or bower:

```sh
npm install domplates
yarn install domplates
bower install domplates
```

Include the library in the html:

```html
<script type="text/javascript" src="domplate/src/index.js"></script>
```

Or import the module using AMD/CommonJS:

```js
var Domplates = require('domplates');
var tmpl = new Domplates();
```

## How to use

To render a template, you only need the `id` of the template and an object with the data to use. The keys in the object are css selectors and the value is the data used. For example:

```html
<template id="tmpl-welcome">
    <p>Hello, <strong></strong>!</p>
</template>
```

```js
const welcome = tmpl.render('tmpl-welcome', {
    strong: 'World'
});

//Insert the result in the dom
document.body.appendChild(welcome);
```

```html
<p>Hello, <strong>World</strong>!</p>
```

The third argument specify whether the result must be inserted in the dom or not. Set `true` to insert the result just before the `<template>` element:

```js
tmpl.render('tmpl-welcome', {
    strong: 'World'
}, true);
```
```html
<p>Hello, <strong>World</strong>!</p>
<template id="tmpl-welcome">
    <p>Hello, <strong></strong>!</p>
</template>
```

Or pass a `Node` instance that will work as the container:

```js
const container = document.getElementById('container');

tmpl.render('tmpl-welcome', {
    strong: 'World'
}, container);
```

(*) The container will be emptied before insert the new content.


### Working with attributes

You can use an object instead a string to edit not only the content of the node but also its attributes. Example:

```js
tmpl.render('tmpl-welcome', {
    strong: {
        html: 'World',
        title: 'The title of the element'
    }
}, true);
```

```html
<p>Hello, <strong title="The title of the element">World</strong>!</p>
```

### Repeat nodes

Use an array to create a new node for each value:

```html
<template id="tmpl-list">
    <ul>
        <li></li>
    </ul>
</template>
```
```js
tmpl.render('tmpl-list', {
    li: [
        'Laura',
        'Miguel',
        'Guille'
    ]
}, true);
```
```html
<ul>
    <li>Laura</li>
    <li>Miguel</li>
    <li>Guille</li>
</ul>
```

And, of course, you can use an array of objects:

```js
tmpl.render('tmpl-list', {
    li: [
        {
            html: 'Laura',
            class: 'is-girl'
        },{
            html: 'Miguel',
            class: 'is-boy'
        },{
            html: 'Guille',
            class: 'is-boy'
        }
    ]
}, true);
```
```html
<ul>
    <li class="is-girl">Laura</li>
    <li class="is-boy">Miguel</li>
    <li class="is-boy">Guille</li>
</ul>
```

### Empty nodes

Nodes with the values `null`, `undefined` or `false` will be removed:

```html
<template id="tmpl-hello">
    <p>Hello <strong></strong></p>
</template>
```
```js
tmpl.render('tmpl-hello', {
    strong: null
}, true);
```
```html
<p>Hello</p>
```

(*) Use empty string if you want to keep empty nodes.

### Subtemplates

You can use also templates within templates:


```html
<template id="tmpl-users">
    <h1></h1>
    <ul>
        <template id="tmpl-user">
        <li>
            <a>
                <strong></strong>
            </a>
            <p></p>
        </li>
        </template>
    </ul>
</template>
```
```js
tmpl.render('tmpl-users', {
    h1: 'List of users',
    '#tmpl-user': [
        {
            strong: 'Laura',
            a: {href: 'http://laura.com'},
            p: 'Web developer'
        },{
            strong: 'Miguel',
            a: {href: 'http://miguel.com'},
            p: 'UX designer'
        },{
            strong: 'Guille',
            a: {href: 'http://guille.com'},
            p: 'Dancing'
        }
    ]
}, true);
```
```html
<h1>List of users</h1>
<ul>
    <li>
        <a href="http://laura.com">
            <strong>Laura</strong>
        </a>
        <p>Web developer</p>
    </li>
    <li>
        <a href="http://miguel.com">
            <strong>Miguel</strong>
        </a>
        <p>UX designer</p>
    </li>
    <li>
        <a href="http://guille.com">
            <strong>Guille</strong>
        </a>
        <p>Dancing</p>
    </li>
</ul>
```

### Functions

When the value of a node or attribute is a function, it will be evaluated. Note that the arguments passed to the function are the node element and the index.

```html
<template id="tmpl-users">
    <ul>
        <li></li>
    </ul>
    <p>First paragraph</p>
    <p>Second paragraph</p>
</template>
```

```js
tmpl.render('tmpl-welcome', {
    p: {
        class: function (el, index) {
            return 'position-' + index;
        }
    },
    li: function () {
        return [
            'Laura',
            'Miguel',
            'Guille',
        ]
    }
}, true);
```

```html
<ul>
    <li>Laura</li>
    <li>Miguel</li>
    <li>Guille</li>
</ul>
<p class="position-0">First paragraph</p>
<p class="position-1">Second paragraph</p>
```

### Events

Any attribute starting with `on` and a function as value will be considered an event:

```html
<template id="tmpl-actions">
    <div class="buttons">
        <button class="button"></button>
    </div>
</template>
```

```js
tmpl.render('tmpl-actions', {
    button: [
        {
            html: 'Click me!'
            onclick: function (event) {
                event.preventDefault();
                alert('Button clicked!')
            }
        },
        {
            html: 'Other button!'
            onclick: function (event) {
                event.preventDefault();
                alert('Other button clicked!')
            }
        }
    ]
}, true);
```

```html
<div class="buttons">
    <button class="button">Click me!</button>
    <button class="button">Other button!</button>
</div>
```

### Data

The attribute `data` is used to save values in the `dataset` property:

```html
<template id="tmpl-actions">
    <button class="button"></button>
</template>
```

```js
tmpl.render('tmpl-actions', {
    button: {
        html: 'Click me!',
        onclick: function (event) {
            alert('Hello ' + this.dataset.name);
        },
        data: {
            name: 'Miguel'
        }
    }
}, true);
```

```html
<div class="buttons">
    <button class="button">Click me!</button>
    <button class="button">Other button!</button>
</div>
```
