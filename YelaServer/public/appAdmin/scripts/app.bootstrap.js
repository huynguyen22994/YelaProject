(function () {
    'use strict';
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');
    //var token = localStorage.getItem('foodTechToken');
    $http({
        url: '/api/administrator/info',
        method: 'GET',
        params: {
            token: 'secrect'
        }
      }).then(function(success) {
        if(success.status === 200) {
          //$http.defaults.headers.post.Authorization = token;
          angular.module('adminInfo', []).constant('adminInfo', success.data.rows[0]);
          angular.element(document).ready(function() {
            angular.bootstrap(document, ['YelaApplication']);
          });
        } else {
          window.location.href = '/login.html';
        }
      }, function(err) {
        window.location.href = '/login.html';
      });
})();