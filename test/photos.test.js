'use strict';

var nock = require('nock');
var expect = require('expect.js');
var unroll = require('unroll');

describe('Photos', function() {

    var pwinty;

    beforeEach(function (){
        pwinty = require('../lib/pwinty')('apiKey', 'merchantId');
        nock.disableNetConnect();
    });

    describe('getOrderPhoto', function () {

        it('gets specfic photo information from an order', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1234/Photos/5678')
                .reply(200, {"id":5678,"type":"4x6","url":"http://www.flickr.com/mytestphoto.jpg","status":"NotYetDownloaded","copies":"4","sizing":"Crop","priceToUser":214,"price":199,"md5Hash":"79054025255fb1a26e4bc422aef54eb4","previewUrl":"http://s3.amazonaws.com/anexampleurl","thumbnailUrl":"http://s3.amazonaws.com/anexamplethumbnailurl","attributes":{"frame_colour":"silver"}});

            pwinty.getOrderPhoto(1234, 5678).then(function (res) {
                expect(res.id).to.be(5678);
                done();
            });
        });

        it('handles errors', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1234/Photos/5678')
                .reply(500);

            pwinty.getOrderPhoto(1234, 5678).catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });
    });

    describe('getOrderPhotos', function () {

        it('gets order photos', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1234/Photos')
                .reply(200, [{"id":5678,"type":"4x6","url":"http://www.flickr.com/mytestphoto.jpg","status":"NotYetDownloaded","copies":"4","sizing":"Crop","priceToUser":214,"price":199,"md5Hash":"79054025255fb1a26e4bc422aef54eb4","previewUrl":"http://s3.amazonaws.com/anexampleurl","thumbnailUrl":"http://s3.amazonaws.com/anexamplethumbnailurl","attributes":{"frame_colour":"silver"}}]);

            pwinty.getOrderPhotos(1234).then(function (res) {
                expect(res.length).to.be(1);
                done();
            });
        });

        it('handles errors', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1234/Photos')
                .reply(500);

            pwinty.getOrderPhotos(1234).catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });
    });

    describe('addPhotoToOrder', function () {

        var mockPhoto = {
            "id": 1483,
            "type": "4x4",
            "url": "photourl",
            "copies": "2",
            "sizing": "ShrinkToExactFit",
            "priceToUser": "450"
        };

        it('adds a single photo to an order', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .post('/v2.1/Orders/1483/Photos', mockPhoto)
                .reply(200, {"id": 1483});

            pwinty.addPhotoToOrder(mockPhoto).then(function (res) {
                expect(res.id).to.be(1483);
                done();
            });
        });

        it('handles errors', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .post('/v2.1/Orders/1483/Photos')
                .reply(500);

            pwinty.addPhotoToOrder(mockPhoto).catch(function (statusCode) {
                expect(statusCode).to.be(500);
                done();
            });
        });

    });

});
