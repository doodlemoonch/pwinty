'use strict';

var _ = require('lodash');
var rp = require('request-promise');

function Pwinty(merchantId, key, host) {

    if (!(this instanceof Pwinty)) {
        return new Pwinty(merchantId, key, host);
    }

    this.merchantId = merchantId;
    this.key = key;
    this.host = host || 'https://sandbox.pwinty.com/v2.1/';

    this.defaults = {
        'headers': {
            'X-Pwinty-MerchantId': merchantId,
            'X-Pwinty-REST-API-Key': key
        },
        'json': true
    };
}

Pwinty.prototype = {

    getCatalogue: function (countryCode, qualityLevel, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Catalogue/' + countryCode + '/' + qualityLevel
        });

        return rp(options);
    }

};

module.exports = Pwinty;
