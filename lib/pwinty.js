'use strict';

var request = require('request');

function Pwinty(merchantId, key, host) {

    if (!(this instanceof Pwinty)) {
        return new Pwinty(merchantId, key, host);
    }

    this.merchantId = merchantId;
    this.key = key;
    this.host = host || 'https://sandbox.pwinty.com/v2.1/';

    this.request = request.defaults({
        'headers': {
            'X-Pwinty-MerchantId': merchantId,
            'X-Pwinty-REST-API-Key': key
        },
        'json': true
    });
}

Pwinty.prototype = {

    getCatalogue: function (countryCode, qualityLevel, callback) {

        var url = this.host + 'Catalogue/' + countryCode + '/' + qualityLevel;

        this.request.get(url, function(error, response, body) {
            callback(error, body);
        });
    }

};

module.exports = Pwinty;
