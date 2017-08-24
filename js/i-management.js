angular.module('i-management',[]).
    controller('parentCtr',function($scope){
        $scope.jump = function(routPath){
            //$location.path(routPath);
            $.mobile.changePage(routPath,{'transition':'slide'})
        };
    
        $(document).on('pagecreate', function (event) {
            //监听到了page的创建
            console.log('page is creating....');
    
            //获取要加载到的容器
            var page = event.target;
    
            //获取作用域对象
            var scope = $(page).scope();
    
            //获取注入器对象
            var injector = $(page).injector();
    
            //调用注入器，为程序提供$compile服务
            injector.invoke(function($compile){
    
                //编译并链接DOM节点
                $compile(page)(scope);
                scope.$digest();
            });
        })
    
    
    }).controller('startCtr',function($scope){


    }).controller('loginCtr',function($scope,$http){
        $scope.hide=true;//是否显示登录错误提示
        $scope.login =function () {
            if($scope.user && $scope.pwd){//判断账号密码是否为空
                $http.get('../data/im-login.php?user='+$scope.user+'&pwd='+$scope.pwd).
                success(function(data){
                    if(data.length){//判断账号密码是否正确
                        console.log(data[0])
                        localStorage.setItem('userLevel',data[0].level);//保存账号权限
                        localStorage.setItem('userEmployeeId',data[0].user_employee_id);//保存该账户对应的用户的姓名
                        $.mobile.changePage('main.html',{'transition':'slide'});

                        //控制登录后和页面返回时显示那个功能模块
                        localStorage.setItem('isShowNewsDiv',true);//新闻模块
                        localStorage.setItem('isShowManagementDiv',false);//员工信息模块
                        localStorage.setItem('isShowSettingDiv',false);//设置模块

                        //控制使用缓存还是向后台请求
                        //新闻模块
                        localStorage.setItem('initNewsDiv',true);
                        localStorage.setItem('divNewsList',[]);
                        //员工信息模块
                        localStorage.setItem('initManagementDiv',true);
                        localStorage.setItem('divManagementList',[]);
                        //设置模块
                        localStorage.setItem('isShowSettingDiv',false);

                        //控制点击下方导航栏新闻按钮时时显示模块还是刷新更多新闻
                        // localStorage.setItem('isUpdateNews',false);
                    }else{
                        $scope.hide=false;
                        $scope.loginMsg='账号或密码错误，请修改后再进行登录操作';
                    }
                });
            }else{
                $scope.hide=false;
                $scope.loginMsg='账号或密码不能为空';
            }
        };


    }).controller('mainCtr',function($scope,$http){
        $scope.navTitle='';//导航栏标题
        /*加载新闻数据*/
        $scope.showNews= function () {
            $scope.navTitle='企业新闻';
            localStorage.setItem('isShowNewsDiv',true);
            localStorage.setItem('isShowManagementDiv',false);
            localStorage.setItem('isShowSettingDiv',false);
            $scope.isShowNews=true;
            $scope.isShowManagement=false;
            $scope.isShowSetting=false;
            $scope.isShowPanel=true;//控制弹出左侧面板按钮的显示隐藏
            $scope.loadingMoreNews = true;  //刷新新闻时显示
            $scope.hasMoreNews = true;  //是否还有更多新闻数据可供加载
            $scope.canShow=true;//将头部导航栏右侧按钮置为显示状态
            $scope.icon='refresh';//将头部导航栏右侧按钮图标置为刷新新闻按钮图标

            //控制器初始化/页面加载时，从服务器读取最前面的5条记录
            if(localStorage.getItem('initNewsDiv')=='true'){
                $http.get('../data/im-news.php?start=0').
                success(function(data){
                    $scope.newsList = data;
                    localStorage.setItem('divNewsList',JSON.stringify(data));
                    localStorage.setItem('initNewsDiv',false);
                });
            }else{
                $scope.newsList = JSON.parse(localStorage.getItem('divNewsList'));
            }

            //“点击刷新”的单击事件处理函数：每点击一次，加载更多的5条数据
            $scope.loadMoreNews = function(){
                $scope.loadingMoreNews = false;
                window.scrollBy(0,-document.body.scrollTop);
                $http.get('../data/im-news.php?start='+$scope.newsList.length).
                success(function(data){
                    $scope.loadingMoreNews = true;
                    if(data.length<5){  //服务器返回的菜品数量不足5条
                        $scope.hasMoreNews = false;
                    }
                    $scope.newsList = data.concat($scope.newsList);
                    localStorage.setItem('divNewsList',JSON.stringify($scope.newsList));
                });
            };
            //为头部导航栏右侧按钮绑定事件
            $scope.clickFn=function () {
                $scope.loadMoreNews();
            };
        };

        //进入新闻详情页
        $scope.showDetailNews= function (nid) {
            localStorage.setItem('nid',nid);
            $.mobile.changePage('newsDetail.html',{'transition':'slide'});
        };

        /*加载员工数据*/
        $scope.showManagement= function () {
            $scope.navTitle='员工信息';
            localStorage.setItem('isShowManagementDiv',true);
            localStorage.setItem('isShowNewsDiv',false);
            localStorage.setItem('isShowSettingDiv',false);
            $scope.isShowManagement=true;
            $scope.isShowNews=false;
            $scope.isShowSetting=false;
            $scope.isShowPanel=true;
            //控制器初始化/页面加载时，从服务器读取最前面的5条记录
            if(localStorage.getItem('initManagementDiv')=='true'){
                $http.get('../data/im-management.php?start=0').
                success(function(data){
                    $scope.managementList = data;
                    localStorage.setItem('divManagementList',JSON.stringify(data));
                    localStorage.setItem('initManagementDiv',false);
                });
            }else{
                $scope.managementList = JSON.parse(localStorage.getItem('divManagementList'));
            }

            $scope.hasMoreManagement = true;  //是否还有更多员工数据可供加载
            //“加载更多”按钮的单击事件处理函数：每点击一次，加载更多的5条数据
            $scope.loadMoreManagement = function(){
                $http.get('../data/im-management.php?start='+$scope.managementList.length).
                success(function(data){
                    if(data.length<5){  //服务器返回的菜品数量不足5条
                        $scope.hasMoreManagement = false;
                    }
                    $scope.managementList = $scope.managementList.concat(data);
                    localStorage.setItem('divManagementList',JSON.stringify($scope.managementList));
                });
            };

            // 监视搜索框中的内容是否改变——监视 kw Model变量
            $scope.$watch('kw', function(){
                if( $scope.kw ){
                    $http.get('../data/im-getEmployeeByKw.php?kw='+$scope.kw).
                    success(function(data){
                        $scope.managementList = data;
                        $scope.hasMoreManagement = false;
                    })
                }else{
                    $scope.managementList = JSON.parse(localStorage.getItem('divManagementList'));
                    $scope.hasMoreManagement = true;
                }
            });
            //添加新员工信息（高权限账号）
            //根据账号权限等级判断头部导航栏右侧按钮是否显示
            $scope.canShow=(localStorage.getItem('isShowManagementDiv')=='true' && localStorage.getItem('userLevel')=='2');//判断当前登录账号等级高低
            if($scope.canShow){
                $scope.icon='plus';//将头部导航栏右侧按钮图标置为添加员工信息按钮图标
                //为头部导航栏右侧按钮绑定事件
                $scope.clickFn=function () {
                    $scope.addEmployee();
                };
            }
            //进入添加新员工信息详情页
            $scope.addEmployee= function () {
                $.mobile.changePage('addEmployee.html',{'transition':'slideup'});
            };
        };

        //进入员工信息详情页
        $scope.showDetailManagement= function (mid) {
            localStorage.setItem('mid',mid);
            $.mobile.changePage('managementDetail.html',{'transition':'slide'});

        };

        /*个人设置*/
        $scope.showSetting= function () {
            $scope.navTitle='设置';
            localStorage.setItem('isShowSettingDiv',true);
            localStorage.setItem('isShowNewsDiv',false);
            localStorage.setItem('isShowManagementDiv',false);
            $scope.isShowSetting=true;
            $scope.isShowNews=false;
            $scope.isShowManagement=false;
            $scope.isShowPanel=false;
            $scope.canShow=false;//将头部导航栏右侧按钮置为隐藏状态
        };

        if(localStorage.getItem('isShowNewsDiv')=='true'){
            $scope.showNews();
            $('#news').addClass('ui-btn-active').siblings('.ui-btn-active').removeClass('ui-btn-active');
        }
        if(localStorage.getItem('isShowManagementDiv')=='true'){
            $scope.showManagement();
            $('#management').addClass('ui-btn-active').siblings('.ui-btn-active').removeClass('ui-btn-active');
        }
        if(localStorage.getItem('isShowSettingDiv')=='true'){
            $scope.showSetting();
            $('#setting').addClass('ui-btn-active').siblings('.ui-btn-active').removeClass('ui-btn-active');
        }


    }).controller('newsDetailCtr',function($scope,$http){
        //根据新闻id（nid）获取新闻详情
        $http.get('../data/im-newsDetail.php?nid='+localStorage.getItem('nid')).
        success(function(data){
            $scope.news = data[0];
        });


    }).controller('managementDetailCtr',function($scope,$http){
        //根据员工id（mid）获取员工信息详情
        $http.get('../data/im-managementDetail.php?mid='+localStorage.getItem('mid')).
        success(function(data){
            $scope.employee = data[0];
            localStorage.setItem('employeeDetail',JSON.stringify(data));//保存员工个人详细信息到缓存中，以便高权限修改，减少服务器请求
        });
        $scope.high=localStorage.getItem('userLevel')=='2';//判断当前登录账号等级高低

        //编辑员工信息（高权限账号）
        $scope.editEmployee=function () {
            $.mobile.changePage('editEmployeeDetail.html',{'transition':'slideup'});
        };
        // 删除员工信息（高权限账号）
        $scope.deleteEmployee=function () {
            $http.get('../data/im-deleteEmployeeDetail.php?mid='+localStorage.getItem('mid')).
            success(function(data){
                console.log(data);
                var tempManagementList=JSON.parse(localStorage.getItem('divManagementList'));
                for(var i=0,newManagementList=[];i<tempManagementList.length;i++){
                    if(tempManagementList[i].mid!=localStorage.getItem('mid')){
                        newManagementList.push(tempManagementList[i])
                    }
                }
                localStorage.setItem('divManagementList',JSON.stringify(newManagementList));
                window.history.go(-1);//绑定ng-click事件，data-rel=‘back’不能触发pagecreate事件
            });
        }

    
    }).controller('editEmployeeDetailCtr',function($scope,$http){
        $scope.high=true;
        $scope.employee = JSON.parse(localStorage.getItem('employeeDetail'))[0];
        //取消编辑操作
        // $scope.backToManagementDetail=function () {
        //     $.mobile.changePage('managementDetail.html',{'transition':'slidedown'});
        // }

        //点击完成触发该事件
        $scope.finishEdit=function () {
            $http.get('../data/im-editEmployeeDetail.php?mid='+localStorage.getItem('mid')+'&phone='+$('#ePhone')[0].value+'&email='+$('#eEmail')[0].value+'&department='+$('#eDepartment')[0].value+'&job='+$('#eJob')[0].value+'&employee_id='+$('#eEmployeeId')[0].value+'&id_card='+$('#eIdCard')[0].value+'&address='+$('#eAddress')[0].value).
            success(function(data){
               console.log(data);
               window.history.go(-1);//绑定ng-click事件，data-rel=‘back’不能触发pagecreate事件
            });
        }

    
    }).controller('addEmployeeCtr',function($scope,$http){
        $scope.finishAddEmployee=function () {
            $http.get('../data/im-addEmployee.php?addName='+$('#addName')[0].value+'&phone='+$('#addPhone')[0].value+'&email='+$('#addEmail')[0].value+'&department='+$('#addDepartment')[0].value+'&job='+$('#addJob')[0].value+'&employee_id='+$('#addEmployeeId')[0].value+'&id_card='+$('#addIdCard')[0].value+'&address='+$('#addAddress')[0].value).
            success(function(data){
                console.log(data);
                window.history.go(-1);//绑定ng-click事件，data-rel=‘back’不能触发pagecreate事件
            });
        }
    
    }).controller('userCtr',function($scope,$http){
        //根据登录账号用户的员工编号（userEmployeeId）获取个人信息
        $http.get('../data/im-userDetail.php?userEmployeeId='+localStorage.getItem('userEmployeeId')).
        success(function(data){
            $scope.userDetail = data[0];
            localStorage.setItem('userDetail',JSON.stringify(data));//保存员工个人详细信息到缓存中，以便修改，减少服务器请求
        });

        //修改个人信息
        $scope.editUser=function () {
            $.mobile.changePage('editUserDetail.html',{'transition':'slideup'});
        }


    }).controller('editUserDetailCtr',function($scope,$http){
        $scope.userDetail = JSON.parse(localStorage.getItem('userDetail'))[0];
        //点击完成触发该事件
        $scope.finishEditUser=function () {
            $http.get('../data/im-editUserDetail.php?userName='+$('#uName')[0].value+'&phone='+$('#uPhone')[0].value+'&email='+$('#uEmail')[0].value+'&department='+$('#uDepartment')[0].value+'&job='+$('#uJob')[0].value+'&employee_id='+$('#uEmployeeId')[0].value+'&id_card='+$('#uIdCard')[0].value+'&address='+$('#uAddress')[0].value).
            success(function(data){
                console.log(data);
                window.history.go(-1);//绑定ng-click事件，data-rel=‘back’不能触发pagecreate事件
            });
        }


    }).controller('aboutCtr',function($scope,$http){
        //获取应用信息
        $http.get('../data/im-about.php').
        success(function(data){
            $scope.about = data[0];
        });


    }).controller('versionCtr',function($scope,$http){
        //获取当前版本信息
        $http.get('../data/im-version.php').
        success(function(data){
            $scope.version = data[0];
        });

        // 检查版本更新
        $scope.hide=true;
        $scope.checkUpdate=function () {
            $scope.hide=false;
        }


    }).controller('adviceCtr',function($scope,$http){
        //点击提交时触发
        $scope.submitAdvice=function () {
            $http.get('../data/im-submitAdvice.php?userEmployeeId='+localStorage.getItem('userEmployeeId')+'&advice='+$('#advice')[0].value).
            success(function(data){
                console.log(data);
                window.history.go(-1);
            });
        }
    });
    
