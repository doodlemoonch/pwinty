var restler = require('restler');

var Pwinty = restler.service(function (sandbox, id, key) {

    this.defaults.headers = {
        'X-Pwinty-MerchantId': id,
        'X-Pwinty-REST-API-Key': key
    };

    if (sandbox) {
        this.baseURL = 'https://sandbox.pwinty.com/v2';
    }

}, { baseURL: 'https://api.pwinty.com/v2' }, {

    getOrder: function (orderId) {
        return this.get('/Orders/' + orderId);
    },

    getOrders: function () {
        return this.get('/Orders');
    },

    updateOrder: function (params) {
        return this.put('/Orders/' + params.id, { data: params });
    },

    getOrderStatus: function (orderId) {
        return this.get('/Orders/' + orderId + '/SubmissionStatus');
    },

    submitOrder: function (orderId) {
        return this.post('/Orders/' + orderId + '/Status', { data: {id: orderId, status: 'Submitted'} });
    },

    cancelOrder: function (orderId) {
        return this.post('/Orders/' + orderId + '/Status', { data: {id: orderId, status: 'Cancelled'} });
    },

    payOrder: function (orderId) {
        return this.post('/Orders/' + orderId + '/Status', { data: {id: orderId, status: 'AwaitingPayment'} });
    },

    createOrder: function (params) {
        return this.post('/Orders', { data: params });
    },

    addPhoto: function (params) {
        var orderId = params.id;
        delete params.id;
        var url = '/Orders/' + orderId + '/Photos';
        return this.post(url, { data: params });
    }
});

module.exports = Pwinty;
