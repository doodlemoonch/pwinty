var restler = require('restler');

var Pwinty = restler.service(function (sandbox, id, key) {

    this.defaults.headers = {
        'X-Pwinty-MerchantId': id,
        'X-Pwinty-REST-API-Key': key
    };

    if (sandbox) {
        this.baseURL = 'https://sandbox.pwinty.com/';
    }

}, { baseURL: 'https://api.pwinty.com/' }, {

    getOrder: function (orderId) {
        return this.get('/Orders', { data:{ id: orderId } });
    },

    getOrderSubmissionStatus: function (orderId) {
        return this.get('/Orders/SubmissionStatus', { data: {id: orderId} });
    },

    createOrder: function (params) {
        return this.post('/Orders', { data: params });
    },

    submitOrder: function (orderId) {
        return this.post('/Orders/Status', { data: {id: orderId, status: 'Submitted'} });
    },

    cancelOrder: function (orderId) {
        return this.post('/Orders/Status', { data: {id: orderId, status: 'Cancelled'} });
    },

    addPhotoToOrder: function (params) {
        return this.post('/Photos', { data: params });
    }
});

module.exports = Pwinty;