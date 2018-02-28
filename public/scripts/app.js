(function (ng) {
  'use strict';

  ng.module('TaskTracker', [
    'TaskTracker.Project',
    'TaskTracker.Task'
  ])
    .controller('MainController', MainController)
    .config(['$locationProvider', function ($locationProvider) {
      $locationProvider.hashPrefix('');
    }]);

  MainController.$inject = [];
  function MainController() {
   
  }

})(angular);