[ ![Travis CI status for doodlemoonch/pwinty](https://travis-ci.org/doodlemoonch/pwinty.svg?branch=v2)](https://travis-ci.org/doodlemoonch/pwinty)

# Pwinty api for Node.js

[Pwinty API for Node.js](https://npmjs.org/package/pwinty) is a library for communicating with the [Pwinty API](http://www.pwinty.com/overview.html). It uses standard callbacks, you can easily wrap in a promises/generator library of your choosing.

## Installation

```bash
$ npm install pwinty
```

## Quick Start

Init pwinty with your api credentials and host (sandbox/live):

```js
var pwinty = require('../lib/pwinty')('apiKey', 'merchantId', 'https://sandbox.pwinty.com:443');
```

Then access the pwinty methods:

Create an order
```js
var orderParams = {};
pwinty.createOrder(orderParams, function (err, order) {

    var photo = {
        type: "4x4",
        url: "photourl",
        copies: "2",
        sizing: "ShrinkToExactFit",
        priceToUser: "450"
    };

    pwinty.addPhotoToOrder(order.id, photo, function (err, order) {
        console.log('photo added');
    });
})
```
