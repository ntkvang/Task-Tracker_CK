(function () {
    'use strict';
    angular.module('app')
        .controller('projectCtrl', function($scope, $http) {
            $scope.itemsPerPage = 10;
            $scope.maxSize = 5;
            $scope.currentPage = 0;

            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.name = '';
            $scope.desription = '';
            $scope.newproject = {};
            $scope.clickedProject = {};
            $scope.projects = [
                {id: 1, name: 'Name 1', description: 'Desc 1'},
                {id: 2, name: 'Name 2', description: 'Desc 2'},
                {id: 3, name: 'Name 3', description: 'Desc 3'},
                {id: 4, name: 'Name 4', description: 'Desc 4'},
                {id: 5, name: 'Name 5', description: 'Desc 5'},
                {id: 7, name: 'Name 7', description: 'Desc 7'},
                {id: 8, name: 'Name 8', description: 'Desc 8'},
                {id: 9, name: 'Name 9', description: 'Desc 9'},
                {id: 10, name: 'Name 10', description: 'Desc 10'},
                {id: 11, name: 'Name 11', description: 'Desc 11'},
                {id: 12, name: 'Name 12', description: 'Desc 12'},
                {id: 13, name: 'Name 13', description: 'Desc 13'},
                {id: 14, name: 'Name 14', description: 'Desc 14'},
                {id: 15, name: 'Name 15', description: 'Desc 15'},
                {id: 16, name: 'Name 16', description: 'Desc 16'},
                {id: 17, name: 'Name 17', description: 'Desc 17'},
                {id: 18, name: 'Name 18', description: 'Desc 18'},
                {id: 19, name: 'Name 19', description: 'Desc 19'},
                {id: 20, name: 'Name 20', description: 'Desc 20'},
                {id: 21, name: 'Name 21', description: 'Desc 21'},
                {id: 22, name: 'Name 22', description: 'Desc 22'},
                {id: 23, name: 'Name 23', description: 'Desc 23'},
                {id: 24, name: 'Name 24', description: 'Desc 24'},
                {id: 25, name: 'Name 25', description: 'Desc 25'},
                {id: 26, name: 'Name 26', description: 'Desc 26'},
                {id: 27, name: 'Name 27', description: 'Desc 27'},
                {id: 28, name: 'Name 28', description: 'Desc 28'},
                {id: 29, name: 'Name 29', description: 'Desc 29'},
                {id: 30, name: 'Name 30', description: 'Desc 30'},
                {id: 31, name: 'Name 31', description: 'Desc 31'},
                {id: 32, name: 'Name 32', description: 'Desc 32'},
                {id: 33, name: 'Name 33', description: 'Desc 33'},
                {id: 34, name: 'Name 34', description: 'Desc 34'},
                {id: 35, name: 'Name 35', description: 'Desc 35'},
                {id: 36, name: 'Name 36', description: 'Desc 36'},
                {id: 37, name: 'Name 37', description: 'Desc 37'},
                {id: 38, name: 'Name 38', description: 'Desc 38'},
                {id: 39, name: 'Name 39', description: 'Desc 39'},
                {id: 40, name: 'Name 40', description: 'Desc 40'},
                {id: 41, name: 'Name 41', description: 'Desc 41'},
                {id: 42, name: 'Name 42', description: 'Desc 42'},
                {id: 43, name: 'Name 43', description: 'Desc 43'},
                {id: 44, name: 'Name 44', description: 'Desc 44'},
                {id: 45, name: 'Name 45', description: 'Desc 45'}
            ];

            // $scope.setItemsPerPage = function(num) {
            //     $scope.itemsPerPage = num;
            // }

            $scope.saveProject = function () {
                var newp = angular.copy($scope.newproject);
                $scope.projects.push($scope.newproject);
                $scope.newproject = {};
            };

            $scope.selectProject = function (projects, index) {
                console.log(projects);
                $scope.clickedProject = angular.copy(projects);
                $scope.clickedProjectIndex = index;

            };
             $scope.delete=function (index) {
                 $scope.projects.splice(index,1);

             }  ;
            $scope.editProject = function () {

                $scope.projects[$scope.clickedProjectIndex] = angular.copy($scope.clickedProject);
            };
            $scope.deleteProject = function () {
                var newProjectList=[];
                $scope.selectAll=false;
                angular.forEach($scope.projects, function(selected){
                    if(!selected.selected){
                        newProjectList.push(selected);
                    }
                });
                $scope.projects=newProjectList;
                $scope.projects.splice($scope.projects.indexOf($scope.clickedProject), 1);
            };

            $scope.selectedList=[];
            $scope.exist=function(item){
                return $scope.selectedList.indexOf(item) >-1;
            };
            $scope.toggleSelection=function (item) {
                var x=$scope.selectedList.indexOf(item);
                if (x>-1){
                    $scope.selectedList.splice(x,1);
                }
                else{
                    $scope.selectedList.push(item);
                }
            }
            // $scope.checkAll=function(){
            //     if($scope.selectAll){
            //         angular.forEach($scope.projects, function(item){
            //             var x=$scope.selectedList.indexOf(item);
            //             if(x >= 0){
            //                 return true;
            //             }
            //             else{
            //                 $scope.selectedList.push(item);
            //             }
            //         })
            //     }
            //     else{
            //         $scope.selectedList = [];
            //     }
            //     angular.forEach($scope.projects, function(p) {
            //         p.selected = $scope.selectAll;
            //     });
            // }
            // $scope.myBtn= $scope.selectedList.length;
            $scope.checkAll=function () {
                var start=$scope.currentPage * $scope.itemsPerPage;
                var end=($scope.currentPage + 1)* $scope.itemsPerPage -1;
                for(var i =start; i<=end;i++){
                    $scope.projects[i].selected=$scope.selectAll;
                }

            };
            $scope.countCheckedDelete = function () {
                var count = _.filter($scope.projects, function (d) {
                    return d.selected;
                });
                // angular.forEach($scope.tasks,function (d) {
                //     if(d.selected) {
                //         count++;
                //     }
                // });
                return count.length;
            };
             $scope.setCheckAll=function (p) {
                 if($scope.selectAll && !p.selected){
                     $scope.selectAll=false;

                 }
                 var checkCount=0;
                 angular.forEach($scope.projects, function (p) {
                     if(p.selected){
                         checkCount++;
                     }

                 });
                 $scope.selectAll=(checkCount===$scope.projects.length);
             };

            /* Pagination */


            $scope.getProjectList = function () {
                // projectService.getList()
                //     .then(function (data) {
                //         vm.projectList = data;
                //     })

                return $http.get('/project')
                    .then(function (res) {
                        // return res && res.data;
                        $scope.projects = res && res.data;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };
            $scope.getProjectList();

        })
}());