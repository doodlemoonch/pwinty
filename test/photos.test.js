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

        it('makes a GET request to /Orders/:orderId/Photos/:photoId', function (done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1234/Photos/5678')
                .reply(200, {"id":5678,"type":"4x6","url":"http://www.flickr.com/mytestphoto.jpg","status":"NotYetDownloaded","copies":"4","sizing":"Crop","priceToUser":214,"price":199,"md5Hash":"79054025255fb1a26e4bc422aef54eb4","previewUrl":"http://s3.amazonaws.com/anexampleurl","thumbnailUrl":"http://s3.amazonaws.com/anexamplethumbnailurl","attributes":{"frame_colour":"silver"}});

            pwinty.getOrderPhoto(1234, 5678, function (err, res) {
                expect(res.id).to.be(5678);
                done();
            });
        });

    });

    describe('deleteOrderPhoto', function () {

        it('makes a DELETE request to /Orders/:orderId/Photos/:photoId', function(done) {

            nock('https://sandbox.pwinty.com:443')
                .delete('/v2.1/Orders/1234/Photos/5678')
                .reply(200, {"id":5678,"type":"4x6","url":"http://www.flickr.com/mytestphoto.jpg","status":"NotYetDownloaded","copies":"4","sizing":"Crop","priceToUser":214,"price":199,"md5Hash":"79054025255fb1a26e4bc422aef54eb4","previewUrl":"http://s3.amazonaws.com/anexampleurl","thumbnailUrl":"http://s3.amazonaws.com/anexamplethumbnailurl","attributes":{"frame_colour":"silver"}});

            pwinty.deleteOrderPhoto(1234, 5678, function (err,res) {
                expect(res.id).to.be(5678);
                done();
            });
        });

    });

    describe('getOrderPhotos', function () {

        it('makes a GET request to /Orders/:id/Photos', function (done) {

            nock('https://sandbox.pwinty.com:443')
                .get('/v2.1/Orders/1234/Photos')
                .reply(200, [{"id":5678,"type":"4x6","url":"http://www.flickr.com/mytestphoto.jpg","status":"NotYetDownloaded","copies":"4","sizing":"Crop","priceToUser":214,"price":199,"md5Hash":"79054025255fb1a26e4bc422aef54eb4","previewUrl":"http://s3.amazonaws.com/anexampleurl","thumbnailUrl":"http://s3.amazonaws.com/anexamplethumbnailurl","attributes":{"frame_colour":"silver"}}]);

            pwinty.getOrderPhotos(1234, function (err, res) {
                expect(res.length).to.be(1);
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

        it('makes a POST request to /Orders/:id/Photos', function (done) {

            nock('https://sandbox.pwinty.com:443')
                .post('/v2.1/Orders/1483/Photos', mockPhoto)
                .reply(200, {"id": 1483});

            pwinty.addPhotoToOrder(mockPhoto, function (err, res) {
                expect(res.id).to.be(1483);
                done();
            });
        });

    });

    describe('addPhotosToOrder', function () {

        var mockPhoto = {
            "id": 1483,
            "type": "4x4",
            "url": "photourl",
            "copies": "2",
            "sizing": "ShrinkToExactFit",
            "priceToUser": "450"
        };

        it('makes a POST request to /Orders/:id/Photos with an array of photos', function (done) {

            nock('https://sandbox.pwinty.com:443')
                .post('/v2.1/Orders/1483/Photos', [mockPhoto, mockPhoto])
                .reply(200, {"id": 1483});

            pwinty.addPhotosToOrder([mockPhoto, mockPhoto], function (err, res) {
                expect(res.id).to.be(1483);
                done();
            });
        });

    });

});
