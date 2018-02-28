(function (ng) {
  'use strict';

  ng.module('TaskTracker.Project')
    .controller('TaskTrackerProjectController', TaskTrackerProjectController);

    TaskTrackerProjectController.$inject = ['$http'];
    function TaskTrackerProjectController($http) {
      
      var vm = this;
      var PROJECT_API_URL = '/project';
      vm.submitNewProject = submitNewProject;
      vm.selectProjectToEdit = selectProjectToEdit;
      vm.cancelEditing = cancelEditing;
      vm.saveProject = saveProject;
      vm.selectProjectToDelete = selectProjectToDelete;
      getProjectList();
  
      function getProjectList() {
        $http.get(PROJECT_API_URL)
          .then(function (res) {
            vm.projectList = res && res.data;
          })
          .catch(function (err) {
            console.error(err);
          });;
      }
  
      function submitNewProject(newProject) {
        // console.log(newProject);
        $http.post(PROJECT_API_URL, newProject)
          .then(function () {
            //console.log(arguments);
            getProjectList();
          })
          .catch(function (err) {
            console.error(err);
          });
        // helperClearObject(newProject);
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
        $http.put(PROJECT_API_URL, targetProject)
          .then(function () {
            getProjectList();
          })
          .catch(function (err) {
            console.error(err);
          })
          .finally(function () {
            vm.isEditting = false;
          });
      }
  
      function selectProjectToDelete(selectedIndex) {
        var selectedItem = vm.projectList[selectedIndex]
        deleteProject(selectedItem);
      }
  
      function deleteProject(targetProject) {
        var deleteURL = PROJECT_API_URL + '/' + targetProject._id;
        $http.delete(deleteURL)
          .then(function () {
            getProjectList();
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