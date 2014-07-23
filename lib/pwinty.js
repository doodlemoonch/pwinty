'use strict';

var _ = require('lodash');
var request = require('request');

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

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    getCountries: function (callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Country'
        });

        return request.get(options, function (error, response, body) {
            callback(error, body);
        });
    },

    getOrders: function (callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders'
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    getOrder: function (id, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders' + '/' + id
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    createOrder: function (params, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders',
            method: 'POST',
            body: params
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    updateOrder: function (params, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + params.id,
            method: 'PUT',
            body: params
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    updateOrderStatus: function (params, callback) {

        var allowedStatuses = ['Cancelled', 'AwaitingPayment', 'Submitted'];

        if (allowedStatuses.indexOf(params.status) > -1) {

            var options = _.extend(this.defaults, {
                url: this.host + 'Orders/' + params.id + '/Status',
                method: 'PUT',
                body: params
            });

            return request(options, function (error, response, body) {
                callback(error, body);
            });

        } else {
            return callback(new Error ('invalid status'), null);
        }
    },

    getOrderStatus: function (id, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + id + '/SubmissionStatus'
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    getOrderPhoto: function (orderId, photoId, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + orderId + '/Photos/' + photoId
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });

    },

    deleteOrderPhoto: function (orderId, photoId, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + orderId + '/Photos/' + photoId,
            method: 'DELETE'
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });

    },

    getOrderPhotos: function (orderId, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + orderId + '/Photos'
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });

    },

    addPhotoToOrder: function (id, photo, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + id + '/Photos',
            method: 'POST',
            body: photo
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    },

    addPhotosToOrder: function (id, photos, callback) {

        var options = _.extend(this.defaults, {
            url: this.host + 'Orders/' + id + '/Photos',
            method: 'POST',
            body: photos
        });

        return request(options, function (error, response, body) {
            callback(error, body);
        });
    }

};

module.exports = Pwinty;
