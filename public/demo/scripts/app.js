(function (ng) {
  'use strict';

  ng.module('TaskTracker', [
    'TaskTracker.Project',
    'TaskTracker.Task',
    'TaskTracker.User'
  ])
    .config(configurationStage)
    .factory('errorHandlerInterceptor', errorHandlerInterceptor)
    .controller('MainController', MainController);

  configurationStage.$inject = ['$locationProvider', '$httpProvider'];
  function configurationStage($locationProvider, $httpProvider) {
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('errorHandlerInterceptor');
  }
  errorHandlerInterceptor.$inject = ['$q', '$window'];
  function errorHandlerInterceptor($q, $window) {
    return {
      responseError: function (response) {
        if (response.status === 401) {
          $window.location = '/demo/login.html';
          return $q.reject(response);
        }
        return $q.resolve(response);
      }
    };
  }
  MainController.$inject = ['$rootScope', '$scope', '$http'];
  function MainController($rootScope, $scope, $http) {

    $scope.isLoading = true;

    $http.get('/user/verify')
      .then(function (res) {
        var userInfo = res && res.data;
        $rootScope.currentUser = userInfo ? userInfo : null;
      })
      .finally(function () {
        $scope.isLoading = false;
      });
  }

})(angular);