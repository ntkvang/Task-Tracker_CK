(function (ng) {
  'use strict';
  ng.module('TaskTracker.Project')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/project', {
        templateUrl: 'scripts/project/project.template.html',
        controller: 'TaskTrackerProjectController',
        controllerAs: 'vm'
      });
    }]);
})(angular);