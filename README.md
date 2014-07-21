[ ![Codeship Status for doodlemoonch/pwinty](https://codeship.io/projects/5a165770-f007-0131-06f7-4eb19103006a/status)](https://codeship.io/projects/27258)

# Pwinty api for Node.js

[Pwinty API for Node.js](https://npmjs.org/package/pwinty) is a promise based library for communicating with the [Pwinty API](http://www.pwinty.com/overview.html).

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
var photo = {
    id: 1483,
    type: "4x4",
    url: "photourl",
    copies: "2",
    sizing: "ShrinkToExactFit",
    priceToUser: "450"
};
var orderParams = {};
pwinty.createOrder(orderParams).then(function (order) {
    pwinty.addPhotoToOrder(photo).then(function() {

    });
})
```
