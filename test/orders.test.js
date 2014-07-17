'use strict';

var nock = require('nock');
var expect = require('expect.js');

describe('Orders', function() {

    var pwinty;

    beforeEach(function (){
        pwinty = require('../lib/pwinty')('apiKey', 'merchantId');
    });

    it('gets all orders', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Orders')
            .reply(200, [{"id": 9144}, {"id": 9145}]);

        pwinty.getOrders().then(function (res) {
            expect(res.length).to.be(2);
            done();
        });
    });

    it('gets a specific order', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Orders/9146')
            .reply(200, {"id": 9146});

        pwinty.getOrders(9146).then(function (res) {
            expect(res.id).to.be(9146);
            done();
        });
    });

    it('handles errors', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Orders')
            .reply(500);

        pwinty.getOrders().catch(function (statusCode) {
            expect(statusCode).to.be(500);
            done();
        });
    });

});
