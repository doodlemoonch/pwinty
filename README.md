[ ![Codeship Status for doodlemoonch/pwinty](https://codeship.io/projects/5a165770-f007-0131-06f7-4eb19103006a/status)](https://codeship.io/projects/27258)

# Pwinty api for Node.js

[Pwinty API for Node.js](https://npmjs.org/package/pwinty) is a library for communicating with the [Pwinty API](http://www.pwinty.com/overview.html).

## Installation

```bash
$ npm install pwinty
```

## Features

* Plain JavaScript
* Lightweight, only one dependency ([request](https://npmjs.org/package/request))

## Quick Start

Init pwinty with your api credentials and host (sandbox/live):

```js
var pwinty = require('../lib/pwinty')('apiKey', 'merchantId', 'host');
```

Then access the pwinty methods:

```js
pwinty.getCatalogue(countryCode, qualityLevel, function (error, response) {
   console.log(response);
});
```
