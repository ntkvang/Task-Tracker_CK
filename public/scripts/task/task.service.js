(function (ng) {
  'use strict';
  ng.module('TaskTracker.Task')
    .factory('taskTrackerTaskService', taskTrackerTaskService);

    taskTrackerTaskService.$inject = ['$http']
  function taskTrackerTaskService($http) {
    var service = {};
    service.PROJECT_API_URL = '/task';
    service.getList = getItemList;
    service.create = createItem;
    service.update = updateItem;
    service.delete = deleteItem;
    return service;

    function getItemList() {
      return $http.get(service.PROJECT_API_URL)
        .then(function (res) {
          return res && res.data;
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function createItem(newItem) {
      return $http.post(service.PROJECT_API_URL, newItem)
        .then(function (res) {          
          return res && res.data;
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function updateItem(targetItem) {
      return $http.put(service.PROJECT_API_URL, targetItem)
      .then(function (res) {          
        return res && res.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    function deleteItem(targetItem) {
      var deleteURLParts = [
        service.PROJECT_API_URL,
        targetItem._id || ''
      ];
      var deleteURL = deleteURLParts.join('/');
      return $http.delete(deleteURL)
        .then(function (res) {
          return res && res.data;
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  }
})(angular);