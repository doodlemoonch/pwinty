'use strict';

var nock = require('nock');
var expect = require('expect.js');

describe('Catalogue', function() {

    var pwinty;

    beforeEach(function (){
        pwinty = require('../lib/pwinty')('apiKey', 'merchantId');
    });

    it('makes a get request to /Catalogue/{countryCode}/{qualityLevel}', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Catalogue/GB/Pro')
            .reply(200, {'countryCode':'GB','country':'UNITED KINGDOM'});

        pwinty.getCatalogue('GB', 'Pro').then(function (res) {
            expect(res.countryCode).to.be('GB');
            done();
        });
    });

    it('handles errors on /Catalogue/{countryCode}/{qualityLevel}', function(done) {

        nock('https://sandbox.pwinty.com:443')
            .get('/v2.1/Catalogue/GB/Pro')
            .reply(500);

        pwinty.getCatalogue('GB', 'Pro').catch(function (statusCode) {
            expect(statusCode).to.be(500);
            done();
        });
    });

});
