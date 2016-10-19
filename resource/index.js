(function () {
    var app = angular.module('app', []);

    app.controller('BaseController', ['$scope',
        function ($scope) {
            $scope.parentFunction = function () {
                alert('case in parent function');
            }

            $scope.callFunction1 = function () {
                alert('1. 调用方法-这是父类的方法');
                $scope.$emit('Func1Emit');
            }

            $scope.callFunction2 = function () {
                var data = {
                    success: true
                };
                $scope.$emit('BeforeCallFunc2', data);
                if (data.success === false) {
                    return false;
                }
                alert('1. 调用方法-这是父类的方法');
            }
        }
    ])

    app.controller('FormController', ['$scope', '$controller',
        function ($scope, $controller) {

            $scope.callSelfFunction = function () {
                alert('case in self function ');
            }

            $scope.$on('Func1Emit', function () {
                alert('2. 子类进行扩展');
            });

            $scope.$on('BeforeCallFunc2', function (event, checkdata) {
                checkdata.success = false;
                alert('2. 覆盖父类方法！！');
            });


            $controller('BaseController', {$scope: $scope});
        }
    ])
})();
