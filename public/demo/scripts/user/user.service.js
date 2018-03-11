(function (ng) {
  'use strict';
  ng.module('TaskTracker.User')
    .factory('taskTrackerUserService', taskTrackerUserService);

  taskTrackerUserService.$inject = ['$http'];
  function taskTrackerUserService($http) {
    var service = {};
    service.USER_API_URL = '/user';
    service.getList = getItemList;

    return service;

    function getItemList() {
      return $http.get(service.USER_API_URL)
      .then(function (res) {
        return res && res.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }
  }
})(angular);