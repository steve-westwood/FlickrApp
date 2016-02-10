describe("dataFactory - ", function () {
    beforeEach(function () {
        module('flickrApp');
        module('flickrApp.services');
    });

    var dataFactory, httpBackend;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            httpBackend = $injector.get('$httpBackend');
            dataFactory = $injector.get('dataFactory');
        })
    });

    it('should have an getPhotosByTagName function', function () {
        expect(angular.isFunction(dataFactory.getPhotosByTagName)).toBe(true);
    });

    it("should call API and return an array of objects", inject(function () {
        var testTagName = 'photoTag';
        var response = [{ testKey: 'testVal' }];
        var actualResponse;
        httpBackend.expectJSONP('http://www.flickr.com/services/feeds/photos_public.gne?tags=' + testTagName + '&format=json&jsoncallback=JSON_CALLBACK').respond(response);
        var promise = dataFactory.getPhotosByTagName(testTagName);
        promise.then(function (result) {
            actualResponse = response;
        });
        httpBackend.flush();
        expect(actualResponse).toEqual(response);
    }))

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();
    });
});