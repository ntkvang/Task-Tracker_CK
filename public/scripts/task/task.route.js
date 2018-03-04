(function (ng) {
  'use strict';
  ng.module('TaskTracker.Task')
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/task', {
        templateUrl: 'scripts/task/task.template.html',
        controller: 'taskTrackerTaskController',
        controllerAs: 'vm'
      });
    }]);
})(angular);