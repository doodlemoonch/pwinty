'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
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
    },

    getOrders: function (id) {

        var url = this.host + 'Orders';
        if (id) {
            url = url + '/' + id;
        }

        var options = _.extend(this.defaults, {
            url: url
        });

        return rp(options);
    },

    createOrder: function (params) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders',
            method: 'POST',
            body: JSON.stringify(params)
        });

        return rp(options);
    },

    updateOrder: function (params) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + params.id,
            method: 'PUT',
            body: JSON.stringify(params)
        });

        return rp(options);
    },

    updateOrderStatus: function (params) {

        var allowedStatuses = ['Cancelled', 'AwaitingPayment', 'Submitted'];

        if (allowedStatuses.indexOf(params.status) > -1) {

            var options = _.extend(this.defaults, {
                url: this.host + 'Orders/' + params.id + '/Status',
                method: 'PUT',
                body: JSON.stringify(params)
            });

            return rp(options);

        } else {
            return new Promise(function (resolve, reject) { reject(); });
        }
    },

    getOrderStatus: function (id) {

        var url = this.host + 'Orders/' + id + '/SubmissionStatus';

        var options = _.extend(this.defaults, {
            url: url
        });

        return rp(options);
    },

    getOrderPhoto: function (orderId, photoId) {

        var url = this.host + 'Orders/' + orderId + '/Photos/' + photoId;

        var options = _.extend(this.defaults, {
            url: url
        });

        return rp(options);

    },

    getOrderPhotos: function (orderId) {

        var url = this.host + 'Orders/' + orderId + '/Photos';

        var options = _.extend(this.defaults, {
            url: url
        });

        return rp(options);

    }

};

module.exports = Pwinty;
