'use strict';

var nock = require('nock');
var expect = require('expect.js');
var unroll = require('unroll');

describe('Orders', function() {

    var pwinty;

    beforeEach(function (){
        pwinty = require('../lib/pwinty')('apiKey', 'merchantId');
        nock.disableNetConnect();
    });

    describe('getOrders', function () {

        it('makes a GET request to /Orders', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders')
                .reply(200, [{"id": 9144}, {"id": 9145}]);

            pwinty.getOrders().then(function (res) {
                expect(res.length).to.be(2);
                done();
            });
        });

        it('makes a GET request to /Orders/:id', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/9146')
                .reply(200, {"id": 9146});

            pwinty.getOrders(9146).then(function (res) {
                expect(res.id).to.be(9146);
                done();
            });
        });

        it('handles errors from /Orders', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders')
                .reply(500);

            pwinty.getOrders().catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });
    });

    describe('createOrder', function () {

        var mockOrder = {
            "address1": "742 Evergreen Terrace",
            "postalOrZipCode": "12345",
            "countryCode": "US",
            "addressTownOrCity": "Springfield",
            "recipientName": "Homer Simpson",
            "stateOrCounty": "Oregon",
            "payment": "InvoiceRecipient",
            "destinationCountryCode": "GB",
            "qualityLevel": "Pro"
        };

        it('makes a POST request to /Orders', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .post('/v2.1/Orders', {"address1":"742 Evergreen Terrace","postalOrZipCode":"12345","countryCode":"US","addressTownOrCity":"Springfield","recipientName":"Homer Simpson","stateOrCounty":"Oregon","payment":"InvoiceRecipient","destinationCountryCode":"GB","qualityLevel":"Pro"})
                .reply(200, {"id": 742});

            pwinty.createOrder(mockOrder).then(function (res) {
                expect(res.id).to.be(742);
                done();
            });
        });

        it('handles errors from /Orders', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .post('/v2.1/Orders')
                .reply(500);

            pwinty.createOrder().catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });

    });

    describe('updateOrder', function() {

        it('makes a PUT request to /Orders/:id', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .put('/v2.1/Orders/742', {"id": "742", "postalOrZipCode": "54321"})
                .reply(200, {"id": 742});

            pwinty.updateOrder({id: 742, postalOrZipCode: '54321'}).then(function (res) {
                expect(res.id).to.be(742);
                done();
            });
        });

        it('handles errors from /Orders', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .put('/v2.1/Orders/742')
                .reply(500);

            pwinty.updateOrder({id: 742, postalOrZipCode: '54321'}).catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });

    });

    describe('updateOrderStatus', function() {

        unroll('makes a PUT request to /Orders/:id/Status with #status', function(done, testArgs) {

            nock('https://sandbox.pwinty.com:443')
                .put('/v2.1/Orders/742/Status', {"id": "742", "status": testArgs.status})
                .reply(200);

            pwinty.updateOrderStatus({id: 742, status: testArgs.status}).then(function (res) {
                done();
            });
        },
        [
            ['status'],
            ['Cancelled'],
            ['AwaitingPayment'],
            ['Submitted']
        ]);

        it('throws an error when trying to update to an invalid status', function (done) {

            pwinty.updateOrderStatus({id: 742, status: 'Invalid'}).catch(function () {
                done();
            });
        });

        it('handles errors from /Orders/:id/Status', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .put('/v2.1/Orders/742/Status')
                .reply(500);

            pwinty.updateOrderStatus({id: 742, status: 'AwaitingPayment'}).catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });
    });

    describe('getOrderStatus', function () {

        it('makes a GET request to /Orders/:id/SubmissionStatus', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1932/SubmissionStatus')
                .reply(200, {"id": 1932, "isValid": false});

            pwinty.getOrderStatus(1932).then(function (res) {
                expect(res.isValid).to.be(false);
                done();
            });
        });

        it('handles errors from /Orders/:id/SubmissionStatus', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1932/SubmissionStatus')
                .reply(500);

            pwinty.getOrderStatus(1932).catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });
    });

});
