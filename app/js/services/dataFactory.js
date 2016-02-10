angular.module('flickrApp.services', [])
    .factory('dataFactory', ['$http', function($http) {
        var dataFactory = {};

        dataFactory.getPhotosByTagName = function (tagName) {
            return $http({ method: 'JSONP', url: 'http://www.flickr.com/services/feeds/photos_public.gne?tags=' + window.encodeURIComponent(tagName) + '&format=json&jsoncallback=JSON_CALLBACK' });
        };

        return dataFactory;
    }]);
