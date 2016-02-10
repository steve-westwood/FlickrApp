angular.module('flickrApp.filters', [])
    .filter('split', function () {
      return function (input, delimiter) {
          var delimiter = delimiter || ',';
          return input.split(delimiter);
      }
  });