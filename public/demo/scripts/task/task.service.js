(function (ng) {
  'use strict';
  ng.module('TaskTracker.Task')
    .factory('taskTrackerTaskService', taskTrackerTaskService);

    taskTrackerTaskService.$inject = ['$http']
  function taskTrackerTaskService($http) {
    var service = {};
    service.TASK_API_URL = '/task';
    service.COMMENT_API_URL_SEGMENT = 'comment'
    service.getList = getItemList;
    service.getDetail = getDetail;
    service.create = createItem;
    service.edit = editItem;
    service.delete = deleteItem;
    service.deleteBulk = deleteBulkItems

    service.formatDataList = formatDataList;
    service.formatListItem = formatListItem;

    service.createComment = createComment;
    service.deleteComment = deleteComment;
    return service;

    function getItemList() {
      return $http.get(service.TASK_API_URL)
        .then(function (res) {
          return formatDataList(res && res.data);
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function getDetail(targetItem) {
      var targetId = ng.isObject(targetItem)?targetItem._id:targetItem;
      var detailUrl = [service.TASK_API_URL, targetId].join('/');
      return $http.get(detailUrl)
        .then(function (res) {
          return formatDataList(res && res.data);
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function createItem(newItem) {
      return $http.post(service.TASK_API_URL, newItem)
        .then(function (res) {          
          return res && res.data;
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function editItem(targetItem) {
      return $http.put(service.TASK_API_URL, targetItem)
      .then(function (res) {          
        return res && res.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    function deleteItem(targetItem) {
      var deleteURLParts = [
        service.TASK_API_URL,
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

    function deleteBulkItems(selectedItemsIndex) {
      var deleteURLParts = [
        service.TASK_API_URL,
        'delete'
      ];
      var deleteURL = deleteURLParts.join('/');
      return $http.post(deleteURL, selectedItemsIndex)
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
      rawListItem.assigneeId = rawListItem.assignee && rawListItem.assignee._id;
      rawListItem.startDate = new Date(rawListItem.startDate);
      rawListItem.dueDate = new Date(rawListItem.dueDate);
    };

    function createComment(targetItem, newComment) {
      var taskId = ng.isObject(targetItem)?targetItem._id:targetItem;
      var requestUrlSegments = [
        service.TASK_API_URL,
        taskId,
        service.COMMENT_API_URL_SEGMENT
      ];
      var requestUrl = requestUrlSegments.join('/');
      var requestBody = {
        // taskId: ng.isObject(targetItem)?targetItem._id:targetItem,
        commentBody: newComment
      }
      return $http.post(requestUrl, requestBody)
      .then(function (res) {          
        return res && res.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    function deleteComment(targetItem, targetComment) {
      var taskId = ng.isObject(targetItem)?targetItem._id:targetItem;
      var commentId = ng.isObject(targetComment)?targetComment._id:targetComment;
      var requestUrlSegments = [
        service.TASK_API_URL,
        taskId,
        service.COMMENT_API_URL_SEGMENT,
        commentId
      ];
      var requestUrl = requestUrlSegments.join('/');
      
      return $http.delete(requestUrl)
      .then(function (res) {          
        return res && res.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }
  }
})(angular);