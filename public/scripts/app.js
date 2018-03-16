(function () {
    'use strict';
angular.module('app', ['ngRoute', 'ui.bootstrap','textAngular'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when("/",{
                templateUrl:'scripts/timeline/templates/timeline.html',
                controller:'MainCtrl'
            })
            .when("/task",{
                templateUrl:'scripts/task/templates/task.html',
                controller:'MainCtrl',
                // name: 'Task Management'



            })
            .when("/timeline",{
                templateUrl:'scripts/timeline/templates/timeline.html',
                 controller:'MainCtrl',
                // name: 'Time Line'

            })
            .when("/project",{
                templateUrl:'scripts/project/templates/project.html',
                 controller:'MainCtrl',
                // name: 'Project'

            })
            .otherwise({
                redirectTo: '/timeline',
                // name: 'Time Line'
            });
    }])
    .controller('MainCtrl', ['$scope','SampleService','$location', function($scope, abc,$location,$route) {
        var service = abc;
        $scope.varFromService = service.key;
        $scope.title = 'This is Time line page';
        $scope.isAction=function (route) {
           return route===$location.path();
        };

        $scope.getAppName = function(){
            if ($location.path() === '/project') {
                return 'Project Management';
            } else if ($location.path() === '/task') {
                return 'Task Management';
            }
        };

}])
    .directive('ngTagsInput', function(){
        return {
            template: '<div>ng-tag-input directive</div>'
        }
    })
    .factory('SampleService', [function(){
        return {
            key: 123
        };
    }])}());
