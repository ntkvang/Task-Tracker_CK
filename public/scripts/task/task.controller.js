(function (ng) {
  'use strict';

  ng.module('TaskTracker.Task')
    .controller('TaskTrackerTaskController', TaskTrackerTaskController);

    TaskTrackerTaskController.$inject = ['$http'];
    function TaskTrackerTaskController($http) {
      
      var vm = this;
      var TASK_API_URL = '/task';
      vm.submitNewTask = submitNewTask;
      vm.selectTaskToEdit = selectTaskToEdit;
      vm.cancelEditing = cancelEditing;
      vm.saveTask = saveTask;
      vm.selectTaskToDelete = selectTaskToDelete;
      getTaskList();
  
      function getTaskList() {
        $http.get(TASK_API_URL)
          .then(function (res) {
            vm.taskList = res && res.data;
          })
          .catch(function (err) {
            console.error(err);
          });;
      }
  
      function submitNewTask(newTask) {
        // console.log(newTask);
        $http.post(TASK_API_URL, newTask)
          .then(function () {
            //console.log(arguments);
            getTaskList();
          })
          .catch(function (err) {
            console.error(err);
          });
        // helperClearObject(newTask);
      }
  
      function selectTaskToEdit(selectedIndex) {
        var selectedItem = vm.taskList[selectedIndex];
        vm.targetTask = angular.copy(selectedItem);
        vm.isEditting = true;
      }
  
      function cancelEditing() {
        vm.isEditting = false;
      }
  
      function saveTask(targetTask) {
        $http.put(TASK_API_URL, targetTask)
          .then(function () {
            getTaskList();
          })
          .catch(function (err) {
            console.error(err);
          })
          .finally(function () {
            vm.isEditting = false;
          });
      }
  
      function selectTaskToDelete(selectedIndex) {
        var selectedItem = vm.taskList[selectedIndex]
        deleteTask(selectedItem);
      }
  
      function deleteTask(targetTask) {
        var deleteURL = TASK_API_URL + '/' + targetTask._id;
        $http.delete(deleteURL)
          .then(function () {
            getTaskList();
          })
          .catch(function (err) {
            console.error(err);
          });
  
      }
  
      // function helperClearObject(targetObj) {
      //   for(var prop in targetObj) {
      //     delete targetObj[prop];
      //   }
      // }
    }

})(angular);