(function() {
    'use strict';

    angular
        .module('YelaApplication.UserManagement')
        .controller('MailController', ControllerController);

    ControllerController.$inject = ['socket', '$scope', 'MailService'];
    function ControllerController(socket, $scope, MailService) {
        var vm = this;

        vm.data = [];
        vm.config = {
          caption: 'Thư khách hàng',
          editor: true,
          sorter: true,
          search: true,
          layout: 'card',
          pageSize: 12,
          pageSizeOptions: '8,12',
          pager: true,
          viewportStop: true
        };  

        activate();

        ////////////////

        function activate() { 
            getMailData();
        }

        function getMailData() {
            MailService.getAllMails()
                .then(function(response) {
                    var data = response.data;
                    console.log(data);
                    if(data) {
                        var letters = data.rows || [];
                        angular.forEach(letters, function(letter) {
                            vm.data.push({
                                Name: letter.name,
                                Phone: letter.phone,
                                Message: letter.message
                            })
                        })
                    }
                })
        }

    }
})();