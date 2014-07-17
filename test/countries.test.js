'use strict';

var nock = require('nock');
var expect = require('expect.js');

describe('Countries', function() {

    var pwinty;

    beforeEach(function (){
        pwinty = require('../lib/pwinty')('apiKey', 'merchantId');
        nock.disableNetConnect();
    });

    it('makes a get request to /Country', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Country')
            .reply(200, [{"countryCode":"GB","hasProducts":false,"name":"United Kingdom"}]);

        pwinty.getCountries().then(function (res) {
            expect(res.length).to.be(1);
            done();
        });
    });

    it('handles errors on /Country', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Country')
            .reply(500);

        pwinty.getCountries().catch(function (statusCode) {
            expect(statusCode).to.be(500);
            done();
        });
    });

});
