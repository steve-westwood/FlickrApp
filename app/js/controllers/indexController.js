angular.module('flickrApp.controllers', [])
.controller('IndexController', ['dataFactory', function (dataFactory) {
    var vm = this;
    vm.search = search;
    vm.searchByTag = searchByTag;
    vm.searchTerm = "";
    vm.hasErrors = false;
    vm.photos = [];
    function search() {
        vm.hasErrors = (!vm.searchTerm) ? true : (vm.searchTerm.trim() === "") ? true : false;
        if (vm.hasErrors) {
            return;
        }
        else {
            dataFactory.getPhotosByTagName(vm.searchTerm).then(function (response) {
                vm.photos = response.data.items;
            }, function(reason) {
                alert('Failed: ' + reason);
            });
        }
    }
    function searchByTag(tagName) {
        vm.searchTerm = tagName;
        vm.search();
    }
}]);