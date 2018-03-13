(function (ng) {
  'use strict';

  ng.module('TaskTracker.Task')
    .controller('taskTrackerTaskController', taskTrackerTaskController);

  taskTrackerTaskController.$inject = ['taskTrackerTaskService', 'taskTrackerProjectService', 'taskTrackerUserService'];
  function taskTrackerTaskController(taskService, projectService, taskTrackerUserService) {

    var vm = this;
    vm.submitNewTask = submitNewTask;
    vm.selectTaskToEdit = selectTaskToEdit;
    vm.cancelEditing = cancelEditing;
    vm.saveTask = saveTask;
    // vm.selectTaskToDelete = selectTaskToDelete;
    vm.deleteTask = deleteTask;
    vm.deleteBulkTasks = deleteBulkTasks;
    vm.canDeleteBulkTasks = canDeleteBulkTasks;

    vm.submitNewComment = submitNewComment;
    vm.selectCommentToDelete = selectCommentToDelete;
    activate();


    ///////////////////// methods definitions //////////////////
    function activate() {
      getTaskList();
      getProjectList();
      getAssigneeList();
    }

    function getTaskList() {
      taskService.getList()
        .then(function (data) {
          vm.taskList = data;
        });
    }

    function getProjectList() {
      projectService.getList()
        .then(function (data) {
          vm.projectList = data;
        });
    }

    function getAssigneeList() {
      taskTrackerUserService.getList()
        .then(function (data) {
          vm.assigneeList = data;
        });
    }

    function submitNewTask(newTask) {
      taskService.create(newTask)
        .then(getTaskList);
    }

    // function selectTaskToEdit(selectedIndex) {
    //   var selectedItem = vm.taskList[selectedIndex];
    //   vm.targetTask = angular.copy(selectedItem);
    //   vm.isEditting = true;
    // }
    function selectTaskToEdit(selectedItem) {
      vm.targetTask = angular.copy(selectedItem);
      vm.isEditting = true;
    }

    function cancelEditing() {
      vm.isEditting = false;
    }

    function saveTask(targetTask) {
      taskService.edit(targetTask)
        .then(getTaskList)
        .finally(cancelEditing);
    }

    // function selectTaskToDelete(selectedIndex) {
    //   var selectedItem = vm.taskList[selectedIndex]
    //   deleteTask(selectedItem);
    // }

    function deleteTask(targetTask) {
      taskService.delete(targetTask)
        .then(getTaskList);
    }

    function deleteBulkTasks() {
      var selectedTaskIds = [];
      for (var i = 0, iLen = vm.taskList.length; i < iLen; i++) {
        if (vm.taskList[i].checked) {
          selectedTaskIds.push(vm.taskList[i]._id);
        }
      }
      taskService.deleteBulk(selectedTaskIds)
        .then(getTaskList);
    }

    function canDeleteBulkTasks() {
      if (!vm.taskList) {
        return false;
      }
      for (var i = 0, iLen = vm.taskList.length; i < iLen; i++) {
        if (vm.taskList[i].checked) {
          return true;
        }
      }
      return false;
    }

    function submitNewComment(targetTask, newComment) {
      taskService.createComment(targetTask, newComment)
        .then(function () {
          taskService.getDetail(targetTask)
            .then(function (data) {
              if (data && data.comments) {
                targetTask.comments = data.comments;
              }
            });
        });
    }

    function selectCommentToDelete(targetTask, targetComment) {
      taskService.deleteComment(targetTask, targetComment)
        .then(function () {
          taskService.getDetail(targetTask)
            .then(function (data) {
              if (data && data.comments) {
                targetTask.comments = data.comments;
              }
            });
        });
    }
  }

})(angular);