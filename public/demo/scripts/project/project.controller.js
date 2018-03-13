(function (ng) {
  'use strict';

  ng.module('TaskTracker.Project')
    .controller('taskTrackerProjectController', taskTrackerProjectController);

  taskTrackerProjectController.$inject = ['taskTrackerProjectService'];
  function taskTrackerProjectController(projectService) {

    var vm = this;
    vm.submitNewProject = submitNewProject;
    vm.selectProjectToEdit = selectProjectToEdit;
    vm.cancelEditing = cancelEditing;
    vm.saveProject = saveProject;
    // vm.selectProjectToDelete = selectProjectToDelete;
    vm.deleteProject = deleteProject;
    vm.deleteBulkProjects = deleteBulkProjects;
    vm.canDeleteBulkProbjects = canDeleteBulkProbjects;

    activate();


    ///////////////////// methods definitions //////////////////
    function activate() {
      getProjectList();
    }

    function getProjectList() {
      projectService.getList()
        .then(function (data) {
          vm.projectList = data;
        })
    }

    function submitNewProject(newProject) {
      projectService.create(newProject)
        .then(getProjectList);
    }

    function selectProjectToEdit(selectedIndex) {
      var selectedItem = vm.projectList[selectedIndex];
      vm.targetProject = angular.copy(selectedItem);
      vm.isEditting = true;
    }

    function cancelEditing() {
      vm.isEditting = false;
    }

    function saveProject(targetProject) {
      projectService.edit(targetProject)
        .then(getProjectList)
        .finally(cancelEditing);
    }

    // function selectProjectToDelete(selectedIndex) {
    //   var selectedItem = vm.projectList[selectedIndex]
    //   deleteProject(selectedItem);
    // }

    function deleteProject(targetProject) {
      projectService.delete(targetProject)
        .then(getProjectList);
    }

    function deleteBulkProjects() {
      var selectedProjectIndex = [];
      for (var i = 0, iLen = vm.projectList.length; i < iLen; i++) {
        if (vm.projectList[i].checked) {
          selectedProjectIndex.push(vm.projectList[i]._id);
        }
      }
      projectService.deleteBulk(selectedProjectIndex)
        .then(getProjectList);
    }

    function canDeleteBulkProbjects() {
      if (!vm.projectList) {
        return false;
      }
      for (var i = 0, iLen = vm.projectList.length; i < iLen; i++) {
        if (vm.projectList[i].checked) {
          return true;
        }
      }
      return false;
    }

  }

})(angular);