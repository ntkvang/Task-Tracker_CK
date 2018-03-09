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
    service.edit = editItem;
    service.delete = deleteItem;

    service.formatDataList = formatDataList;
    service.formatListItem = formatListItem;
    return service;

    function getItemList() {
      return $http.get(service.PROJECT_API_URL)
        .then(function (res) {
          return formatDataList(res && res.data);
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

    function editItem(targetItem) {
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

    function formatDataList(rawDataList) {
      rawDataList = rawDataList || [];
      Array.prototype.forEach.call(rawDataList, formatListItem);
      return rawDataList;
    }

    function formatListItem(rawListItem) {
      rawListItem.projectId = rawListItem.project && rawListItem.project._id;
      rawListItem.startDate = new Date(rawListItem.startDate);
      rawListItem.dueDate = new Date(rawListItem.dueDate);
    };
  }
})(angular);