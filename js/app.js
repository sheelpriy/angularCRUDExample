'use strict';

// Declare app level module which depends on filters, and services
angular.module('contactPath', ['contactPath.filters', 'contactPath.services', 'contactPath.directives']).
    run(function ($rootScope) {
        $rootScope.search = "";
    }).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {templateUrl:'partials/add.html', controller:AddCtrl})
    $routeProvider.when('/view/:id', {templateUrl:'partials/view.html', controller:ViewCtrl });
    $routeProvider.when('/edit/:id', {templateUrl:'partials/edit.html', controller:EditCtrl });
    $routeProvider.otherwise({redirectTo:'/'});
}]);
var AddCtrl = function ($scope, $location, contacts) {
    $scope.contactdata = {};
    $scope.save = function (contactdata) {
        var id = contacts.save({name:contactdata.name, phone:contactdata.phone, email:contactdata.email});
        $location.path('/view/' + id);
    }
}


var ViewCtrl = function ($scope, contacts, $routeParams) {
    $scope.contact = contacts.get($routeParams.id);
}

var EditCtrl = function ($scope, $routeParams, $location, contacts) {
    $scope.contactdata = contacts.get($routeParams.id);
    $scope.update = function (contactdata) {
        var id = contacts.update({id:contactdata.id, name:contactdata.name, phone:contactdata.phone, email:contactdata.email});
        $location.path('/view/' + id);
    }
    $scope.delete = function (id) {
        contacts.remove(id);
        $location.path('/');
    }
}

var SearchCtrl = function ($scope, contacts) {

    $scope.contacts = contacts.contacts;
}

var ListCtrl = function ($scope, contacts) {
    $scope.contactLists = contacts.contactLists;
    $scope.$watch(
        function () {
            return contacts.contactLists;
        },
        function (value) {
            if (value) {
                $scope.contactLists = contacts.contactLists;
            }
        });
}