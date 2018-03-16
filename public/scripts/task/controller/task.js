(function () {
    'use strict';
    angular.module('app')
        .controller('TaskCtrl',function ($scope,$http,$route) {
            $scope.itemsPerPage = 10;
            $scope.maxSize = 5;
            $scope.currentPage = 1;
            $scope.reloadData=function () {
                $route.reload();

            };
            $scope.addTask = {};
            $scope.clickedTask = {};
            $scope.name = '';
            $scope.description = '';
            $scope.assignee = '';
            $scope.startDate = '';
            $scope.dueDate = '';
            $scope.project = '';
            $scope.color = '';
            $scope.status = '';
            $scope.tags = [];
            $scope.tasks = [];
            //     {
            //
            //         'name': 'task abcd 01',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: [],
            //         'comments': [
            //             {id: 1,
            //             text: 'hello word'},
            //             {
            //                 id: 2,
            //                 text:'My comment'
            //             }
            //         ]
            //     },
            //     {
            //
            //         'name': 'Task 123',
            //         'description': 'abcd',
            //         'assignee': 'Nguyen Thi Kim Vang',
            //         'startDate': '1/1/2018',
            //         'dueDate': '4/1/2018',
            //         'project': 'Task Traker',
            //         'status': 'Done',
            //         'tags': [{id: 1, name: 'tag 1'}], // sua cho nay [ { name: 'tag 1' } ]
            //         shortenInputTags: [],
            //         'comments':[
            //             {
            //                 id: 1,
            //                 text: 'Hello word 2',
            //
            //             },
            //             {
            //               id: 2,
            //               text:'My comment 2'
            //             },
            //             {id: 3, text:'comment haha'}
            //         ]
            //     },
            //     {
            //
            //         'name': 'task abcd 02',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 03',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 04',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 05',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 06',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 07',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 08',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}],
            //         shortenInputTags: []
            //     },
            //     {
            //
            //         'name': 'task abcd 09',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}]
            //     },
            //     {
            //
            //         'name': 'task abcd 10',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}]
            //     },
            //     {
            //
            //         'name': 'task abcd 11',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}]
            //     },
            //     {
            //
            //         'name': 'task abcd 12',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}]
            //     },
            //     {
            //
            //         'name': 'task abcd 13',
            //         'description': 'abcd',
            //         'assignee': 'Tran Thi Phuong Thao',
            //         'startDate': '01/01/2018',
            //         'dueDate': '04/01/2018',
            //         'project': 'Task Traker',
            //         'status': 'Doing',
            //         'tags': [{id: 1, name: 'tag 1'},
            //             {id: 2, name: 'tag 2'}]
            //     }
            // ];
            $scope.users = [
                {
                    name: 'Nguyen Thi Kim Vang',
                    username: 'ntkvang',
                    id: 1
                },
                {
                    name: 'Tran Thi Phuong Thao',
                    username: 'ttpthao',
                    id: 2
                }

            ];
            $scope.projectTask=[
                {
                    name: 'Project 1',
                    id: 1
                },
                {
                    name: 'Project 2',
                    id: 2
                },
                {
                    name: 'Project 3',
                    id: 3
                }
            ];
            $scope.statususer = [
                {
                    id: 1,
                    name: 'Done',
                    color: 'sucuss'
                },
                {
                    id: 2,
                    name: 'Undone',
                    color: 'danger'
                },
                {
                    id: 3,
                    name: 'Doing',
                    color: 'Wraning'
                }
            ];
            $scope.addTask.Startdate = new Date();
            $scope.addTask.Duedate = new Date();

            $scope.addTaskFunction = function () {
                // goi API get project
                $scope.addTask = {};
                $scope.addTask.tags = [];
                $http.get('/project')
                    .then(function (res) {
                        if (res && res.data && res.data.length > 0) {
                            // nho reformat data
                            $scope.projects = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                    });

            };

            $scope.saveTask = function () {
                // var newt = {};
                // newt.name = $scope.addTask.name;
                // newt.Description = $scope.addTask.Description;
                // newt.Assigner = $scope.addTask.Assigner.name;
                // newt.Startdate = $scope.addTask.Startdate;
                // newt.Duedate = $scope.addTask.Duedate;
                // newt.projectname = $scope.addTask.projectname;
                // newt.Color = $scope.addTask.Color;
                // newt.Status = $scope.addTask.Status;
                // newt.Tags = $scope.addTask.Tags;
                // $scope.tasks.push(newt);

                var newt = angular.copy($scope.addTask);

                // copy tags vo task
                $scope.addTask.tags = angular.copy($scope.inputTags);
                $scope.addTask.shortenInputTags = angular.copy($scope.shortenInputTags);

                // them task vo list
                $scope.tasks.push($scope.addTask);

                $scope.inputTags = [];
                //comment
                $scope.addTask = {};

                console.log(newt);
            };
            $scope.remove = function () {
                var newtasksList = [];
                $scope.selectedAll = false;
                angular.forEach($scope.tasks, function (selected) {
                    if (!selected.selected) {
                        newtasksList.push(selected);
                    }
                });
                $scope.tasks = newtasksList;
                // calcPagination(0);
            };

            $scope.checkAll=function () {
                // angular.forEach($scope.tasks, function (task) {
                //     task.selected = $scope.selectedAll;
                // });
                var start=($scope.currentPage - 1) * $scope.itemsPerPage;
                var end=($scope.currentPage )* $scope.itemsPerPage -1;
                if(end > $scope.tasks.length - 1) {
                    end = $scope.tasks.length - 1;
                }
                for(var i =start; i<=end;i++){
                    $scope.tasks[i].selected=$scope.selectAll;
                }

            };

            $scope.checkIndividualTask = function (task) {
                /* $scope.tasks la so luong task o 1 trang (neu co phan trang) */
                // var countChecked = $scope.tasks.filter(function (t){
                //     return (t.selected === true);
                // });

                var countChecked = _.filter($scope.tasks, function (t) {
                    return t.selected;
                });

                $scope.selectedAll = (countChecked.length === $scope.tasks.length);
            };
            $scope.countCheckedDelete = function () {
                var count = _.filter($scope.tasks, function (d) {
                    return d.selected;
                });
                // angular.forEach($scope.tasks,function (d) {
                //     if(d.selected) {
                //         count++;
                //     }
                // });
                return count.length;
            };
            /* ~~ */
            $scope.selectTask = function (task, id) {
                console.log(task);
                $scope.clickedTask = angular.copy(task);
                $scope.clickedTask.startDateObject = new Date($scope.clickedTask.startDate);
                $scope.clickedTask.dueDateObject = new Date($scope.clickedTask.dueDate);
                $scope.clickedTaskID = id;
                console.log($scope.clickedTaskID);
                /* goi API project*/
                $http.get('/project')
                    .then(function (res) {
                        if (res && res.data && res.data.length > 0) {
                            // nho reformat data
                            $scope.projects = res.data;
                        }
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };
            $scope.update = function () {
                //$scope.clickedTask
                //$scope.tasks
                //$scope.clickedTaskID
                $scope.tasks[$scope.clickedTaskID] = $scope.clickedTask;
                $scope.clickedTask = {};
            };
            $scope.delete = function (index) {

                // $scope.tasks.splice($scope.tasks.indexOf($scope.clickedTask),1);
                $scope.tasks.splice(index, 1);
            };

            $scope.labelColor = function (status) {
                // { 'bg-warning': task.status === 'Doing', 'bg-success': task.status === 'Done' }

                var obj = {
                    'Doing': 'bg-warning',
                    'Done': 'bg-success',
                    'Undone': 'bg-danger'

                };
                return obj[status];

            };
            $scope.inputTags = [];
            $scope.shortenInputTags = [];
            $scope.addTag = function () {
                if ($scope.addTask.tags.length === 0) {
                    return;
                }
                $scope.inputTags.push({name: $scope.addTask.tags});
                $scope.addTask.tags = '';
            };
            $scope.addTagFunc = function (newItem, itemList, tag) {
                if (angular.isArray(itemList) && newItem) {
                    itemList.push({name: newItem});
                }
                if ($scope.shortenInputTags.length < 2) {
                    $scope.shortenInputTags.push({name: $scope.addTask.tags, action: angular.noop})
                }
                if ($scope.shortenInputTags.length === 2) {
                    $scope.shortenInputTags.push({
                        name: '...', action: function (task) {
                            /* xu ly show all tags */
                            console.log('show all tags ', task.tags);
                        }
                    });
                }
                newItem = '';
            };
            // $scope.inputTags.push({name:'Tag Text'})
            $scope.deleteTag = function (key) {
                if ($scope.inputTags.length > 0 &&
                    $scope.addTask.tags.length === 0 &&
                    key === undefined) {
                    $scope.inputTags.pop();

                } else if (key !== undefined) {
                    $scope.inputTags.splice(key, 1);
                }
            };
            $scope.deleteTagEdit=function(key){
                if($scope.clickedTask.tags.length >0 &&
                $scope.clickedTask.tags.length===0 &&
                key===undefined){
                    $scope.clickedTask.tags.pop();
                }
                else if(key !==undefined){
                    $scope.clickedTask.tags.splice(key,1);
                }
            };
            /* search function */
            // $scope.searchData = function(){
            //     var data=[];
            //     console.log('keyword', $scope.searchText);
            //     angular.forEach($scope.tasks,function(keyword)
            //         {
            //            if($scope.searchText==$scope.tasks)
            //            {
            //                $scope.task={};
            //                $scope.task.push($scope.addTask);
            //            }
            //
            //         }
            //     );
            // };
            /* Comment */
            $scope.saveComment = function (newComment){
                var selectedTask = $scope.tasks[$scope.clickedTaskID];
                if(selectedTask) {
                    selectedTask.comments = selectedTask.comments || [];
                    selectedTask.comments.push({text: newComment});
                }
                $scope.clickedTask = angular.copy(selectedTask);
                // $scope.tasks[$scope.clickedTaskID] = $scope.clickedTask;
                // $scope.clickedTask = {};

            };
            $scope.deleteComment=function (index) {
                $scope.clickedTask.comments.splice(index,1);
            };

            /* Pagination */
            // $scope.currentPage = 0;
            // $scope.gap = 5;
            // $scope.pageSize = 2;
            // $scope.pageTasks = [];
            // $scope.numberOfPage = function () {
            //      return Math.ceil($scope.tasks.length / $scope.pageSize);
            // };
            // $scope.prePage = function () {
            //     if ($scope.currentPage > 0) {
            //         $scope.currentPage--;
            //     }
            //      if ($scope.currentPage === Math.ceil($scope.numberOfPage() / 2)-1) {
            //     //    if ($scope.currentPage === Math.ceil($scope.numberOfPage() / 2) - 1) {
            //         /* sai o day */
            //         //calcPagination(false, Math.ceil($scope.gap / 2));
            //          calcPagination(false,Math.ceil($scope.gap / 2));
            //     }
            // };
            // $scope.nextPage = function () {
            //     if ($scope.currentPage < $scope.numberOfPage()) {
            //         $scope.currentPage++;
            //     }
            //     if ($scope.currentPage === Math.ceil($scope.numberOfPage() / 2)-1) {
            //         //if ($scope.currentPage === Math.ceil($scope.numberOfPage() / 2) - 1) {
            //         /* va o day */
            //         //calcPagination(Math.ceil($scope.gap / 2));
            //         calcPagination(Math.ceil($scope.gap / 2));
            //     }
            // };
            // $scope.pagination = [];
            // function calcPagination(start, end) {
            //     var pages;
            //
            //     if ($scope.numberOfPage() < $scope.gap) {
            //         pages = $scope.numberOfPage();
            //     } else {
            //         pages = $scope.gap;
            //     }
            //     // if (!$scope.pagination.length) {
            //         $scope.pagination.length = 0;
            //         for (var i = start; i < pages; i++) {
            //             $scope.pagination.push(i);
            //         }
            //     // }
            //     if (start) {
            //         for (var j = 0; j < start - 1; j++) {
            //             _.remove($scope.pagination, function (n, index) {
            //                 return index === 0;
            //             });
            //             console.log($scope.pagination);
            //
            //             $scope.pagination.push($scope.gap + j);
            //             console.log($scope.pagination);
            //         }
            //     }
            //     if (end) {
            //         for (var k = end; k > 1; k--) {
            //             _.remove($scope.pagination, function (n, index) {
            //                 // return index === $scope.pagination.length-1;
            //                 return index===$scope.pagination.length-1;
            //             });
            //             console.log($scope.pagination);
            //             $scope.pagination.unshift($scope.pagination[0]-1);
            //             console.log($scope.pagination);
            //         }
            //     }
            // }
            // calcPagination(0);
            // $scope.setPage = function () {
            //     $scope.currentPage = this.n;
            //     if ($scope.currentPage === Math.ceil($scope.numberOfPage() / 2)) {
            //         calcPagination(Math.ceil($scope.gap / 2));
            //     }
            // };
            $scope.getTaskList = function () {
                return $http.get('/task')
                    .then(function (res) {
                        /* reformat data */
                        var result = [];
                        var item;
                        // $scope.tasks = res.data;

                        angular.forEach(res.data, function(obj){
                            item = {};
                            item._id = obj._id;
                            item.name = obj.name;
                            item.description = obj.description;
                            item.assignee = obj.assignee;
                            item.startDate = obj.startDate;
                            item.dueDate = obj.dueDate;
                            item.status = obj.status;
                            item.project = obj.project;
                            item.tags = obj.tags;
                            item.comments = obj.comments;

                            result.push(item);
                        });

                        $scope.tasks = result;

                        // $scope.tasks = result;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };
            $scope.getTaskList();

            $scope.createTask=function (newTask) {

                return $http.post('/task',newTask)
                    .then(function (res) {
                        // $scope.tasks=res && res.data;
                        $scope.getTaskList();
                    },function (error) {
                        console.log('error',error);
                    })
                    .catch(function (err){
                        console.error(err);
                    });
            };
            $scope.editTask=function (updateTask) {
                return $http.put('/task', updateTask)
                    .then(function (res) {
                        $scope.tasks=res &&res.data;
                        $scope.getTaskList();
                    },function (error) {
                        console.log('error',error);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };

            $scope.deleteTask=function (selectTask) {
                return $http.delete('/task/'+selectTask._id)
                    .then(function (res) {
                        $scope.tasks=res && res.data;
                        $scope.getTaskList();
                    },function (error) {
                        console.log('error',error);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });

            };
            $scope.deleteAllTask=function () {
                var newTaskList=[];
                var selectedTask=[];
                $scope.selectedAll=false;
                angular.forEach($scope.tasks, function (selected) {
                    if(!selected.selected)
                    {
                        newTaskList.push(selected._id);
                    }else {
                        selectedTask.push(selected._id)
                    }
                });
                $scope.tasks=newTaskList;

                return $http.post('task/delete',selectedTask)
                    .then(function (res) {
                        $scope.tasks=res && res.data;
                        $scope.getTaskList();
                    },function (error) {
                        console.log('error',error);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };
            $scope.createComment=function (newComment) {
                var selectedTask = $scope.tasks[$scope.clickedTaskID];
                if(selectedTask) {
                    selectedTask.comments = selectedTask.comments || [];
                    selectedTask.comments.push({commentBody: newComment});
                }
                var requestBody = {
                    commentBody: newComment
                };
                // $scope.clickedTask = angular.copy(selectedTask);
                return $http.post('task/' + $scope.clickedTask._id + '/comment', requestBody)
                    .then(function (res) {
                        $scope.getTaskList()
                            .then(function () {
                            var foundItem = _.find($scope.tasks, function (task){
                                return task._id === $scope.clickedTaskID;
                            });
                            $scope.clickedTask.comments = foundItem.comments;
                        });
                    }, function (error) {
                        console.log('error',error);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };
            $scope.deleteComment=function (selectedComment) {
                var requestBody = {
                    commentBody: selectedComment
                };
                return $http.delete('task/'+ $scope.clickedTask._id+'/comment/'+ selectedComment,requestBody)
                    .then(function (res) {
                        $scope.tasks=res &&res.data;
                        $scope.getTaskList();
                    }, function (error) {
                        console.log('error',error);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            };
        })

        // .filter('startForm', function () {
        //     return function (input, start) {
        //         start=+start;
        //         return input.slice(start);
        //     }
        // })
        .directive('tagInput', function(){
            return{
                restrict:'A',
                link:function(scope,element,attrs){
                    scope.inputWidth=100;
                    scope.$watch(attrs.ngModel, function(value){
                        if(value !=undefined){
                            var tempEl=$('<span>'+value+'<span>').appendTo('body');
                            scope.inputWidth=tempEl.width()+5;
                            tempEl.remove();
                        }
                    });
                    element.bind('keydown', function(e)
                    {
                        if(e.which==9){
                            e.preventDefault();
                        }
                        if(e.which==8){
                            scope.$apply(attrs.deleteTag);
                        }

                    });
                    element.bind('keyup',function(e){
                        var key=e.which;
                        if(key==9||key==13){
                            e.preventDefault();
                            scope.$apply(attrs.newTag);
                        }
                    });
                }
            }
        })
}());