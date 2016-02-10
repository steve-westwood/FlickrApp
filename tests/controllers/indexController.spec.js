describe('indexController - ', function () {
    var controller, mockDataFactory, serviceReturnVal;
    beforeEach(function () {
        module('flickrApp');
        module('flickrApp.controllers');
    });

    beforeEach(function () {
        serviceReturnVal = [{ testKey: 'testVal' }];
        module(function ($provide) {
            $provide.value('dataFactory', {
                getPhotosByTagName: function () {
                    return {
                        then: function () {
                            return {
                                'response': function (response) {
                                    return serviceReturnVal;
                                },
                                'responseError': function (rejection) {
                                    return 'error';
                                }
                            };
                        }
                    };
                }
            });
        });
        
        inject(function (_dataFactory_) {
            mockDataFactory = _dataFactory_;
        });

        inject(function ($controller) {
            controller = $controller('IndexController', { dataFactory: mockDataFactory });
        })
    });

    it('should initialise scope variables', function () {
        expect(controller.searchTerm).toBe('');
        expect(controller.photos).toEqual([]);
        expect(controller.hasErrors).toBeFalsy();
    });

    it('should initialise scope functions', function () {
        expect(controller.search).toBeDefined();
        expect(controller.searchByTag).toBeDefined();
    });

    it('should not call API if searchTerm is invalid', function () {
        spyOn(controller, 'search').and.callThrough();
        spyOn(mockDataFactory, 'getPhotosByTagName').and.callThrough();
        var searchTerm;
        controller.searchTerm = searchTerm;
        controller.search();
        expect(controller.search).toHaveBeenCalled();
        expect(mockDataFactory.getPhotosByTagName).not.toHaveBeenCalled();
        searchTerm = '  ';
        controller.searchTerm = searchTerm;
        controller.search();
        expect(controller.search).toHaveBeenCalled();
        expect(mockDataFactory.getPhotosByTagName).not.toHaveBeenCalled();

    });

    it('should call api if searchTerm is valid when search function is called', function () {
        spyOn(controller, 'search').and.callThrough();
        spyOn(mockDataFactory, 'getPhotosByTagName').and.callThrough();
        var searchTerm = 'test';
        controller.searchTerm = searchTerm;
        controller.search();
        expect(controller.search).toHaveBeenCalled();
        expect(mockDataFactory.getPhotosByTagName).toHaveBeenCalledWith(searchTerm);

    });

    it('should save search term and search if search by tag function is invoked', function () {
        spyOn(controller, 'searchByTag').and.callThrough();
        spyOn(controller, 'search').and.callThrough();
        var initialSearchTerm = 'initial', changedSearchTerm = 'changed';
        controller.searchTerm = initialSearchTerm;
        expect(controller.searchTerm).toBe(initialSearchTerm);
        controller.searchByTag(changedSearchTerm);
        expect(controller.searchByTag).toHaveBeenCalledWith(changedSearchTerm);
        expect(controller.searchTerm).not.toBe(initialSearchTerm);
        expect(controller.searchTerm).toBe(changedSearchTerm);
        expect(controller.search).toHaveBeenCalled();
    });
});