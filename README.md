[ ![Travis CI status for doodlemoonch/pwinty](https://travis-ci.org/doodlemoonch/pwinty.svg?branch=v2)](https://travis-ci.org/doodlemoonch/pwinty)

# Pwinty api for Node.js

[Pwinty API for Node.js](https://npmjs.org/package/pwinty) is a library for communicating with the [Pwinty API](http://www.pwinty.com/overview.html).

## Installation

```bash
$ npm install pwinty
```

## Features

* Plain JavaScript
* Lightweight, only one dependency ([restler](https://npmjs.org/package/restler))

## Quick Start

First, add the module to your project:

```js
var Pwinty = require('pwinty');
```

Second, init pwinty with your api credentials:

```js
var pwinty = new Pwinty(cfg.pwinty.useSandbox, cfg.pwinty.merchantId, cfg.pwinty.apiKey);
```

Then access the pwinty methods:

```js
pwinty.getOrder(1234).on('complete', function (order) {
    console.log(order);
});
```
