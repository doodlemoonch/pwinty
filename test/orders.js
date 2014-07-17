var Pwinty = rewire('../lib/pwinty');

var restlerMock = require('restler');
var getSpy = sinon.stub(restlerMock.Service.prototype, 'get');
var postSpy = sinon.stub(restlerMock.Service.prototype, 'post');
var putSpy = sinon.stub(restlerMock.Service.prototype, 'put');

Pwinty.__set__({
    restler: restlerMock
});

describe('Orders', function () {

    var pwinty;

    beforeEach(function () {
        pwinty = new Pwinty('url', 'merchantId', 'apiKey');
    });

    describe('.createOrder()', function () {

        it('posts /Orders', function () {
            var params = {'name': 1};
            pwinty.createOrder(params);
            restlerMock.Service.prototype.post.should.have.been.calledWith('/Orders', { data: params });
        });

    });

    describe('.updateOrder(params)', function () {

        it('puts /Orders', function () {
            var params = {'name': 1, 'id': 1234};
            pwinty.updateOrder(params);
            restlerMock.Service.prototype.put.should.have.been.calledWith('/Orders/1234', { data: params });
        });

    });

    describe('.getOrder(id)', function () {

        it('gets /Orders/id', function () {
            pwinty.getOrder(1234);
            restlerMock.Service.prototype.get.should.have.been.calledWith('/Orders/1234');
        });

    });

    describe('.getOrders()', function () {

        it('gets /Orders', function () {
            pwinty.getOrders();
            restlerMock.Service.prototype.get.should.have.been.calledWith('/Orders');
        });

    });

    describe('.getOrderStatus(id)', function () {

        it('gets /Orders/id/SubmissionStatus', function () {
            pwinty.getOrderStatus(1234);
            restlerMock.Service.prototype.get.should.have.been.calledWith('/Orders/1234/SubmissionStatus');
        });

    });

    describe('.submitOrder(id)', function () {

        it('posts /Orders/id/Status with "Submitted"', function () {
            var params = {id: 1234, status: 'Submitted'};
            pwinty.submitOrder(1234);
            restlerMock.Service.prototype.post.should.have.been.calledWith('/Orders/1234/Status', { data: params });
        });

    });

    describe('.payOrder(id)', function () {

        it('posts /Orders/id/Status with "AwaitingPayment"', function () {
            var params = {id: 1234, status: 'AwaitingPayment'};
            pwinty.payOrder(1234);
            restlerMock.Service.prototype.post.should.have.been.calledWith('/Orders/1234/Status', { data: params });
        });

    });

    describe('.cancelOrder(id)', function () {

        it('posts /Orders/id/Status with "Cancelled"', function () {
            var params = {id: 1234, status: 'Cancelled'};
            pwinty.cancelOrder(1234);
            restlerMock.Service.prototype.post.should.have.been.calledWith('/Orders/1234/Status', { data: params });
        });

    });

    describe('.addPhoto(params)', function () {

        it('posts /Orders/id/Photos with params', function () {
            var params = {id: 1234, type: '4x4'};
            pwinty.addPhoto(params);
            restlerMock.Service.prototype.post.should.have.been.calledWith('/Orders/1234/Photos', { data: {type: '4x4'} });
        });

    });

});
