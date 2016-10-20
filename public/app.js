angular.module('token-demo', [])
.controller('mainCtrl', function($scope, $http) {
    $scope.login = function(username, password) {
        console.log('logging in')
        $http({
            method: 'POST',
            url: '/auth',
            data: {
                username,
                password
            }
        })
        .then(res => {
            sessionStorage.setItem('myToken', res.data.token);
            $scope.user = res.data.user;
        })
    }

    $scope.getUser = function() {
        $http({
            method: 'GET',
            url: '/auth/me',
            headers: {
                'Authorization': sessionStorage.getItem('myToken')
            }
        })
        .then(res => {
            $scope.data = res.data;
        })
    }
})
