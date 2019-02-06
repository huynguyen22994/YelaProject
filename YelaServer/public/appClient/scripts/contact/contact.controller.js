(function() {
    'use strict';

    angular
        .module('YelaAppClient.Contact')
        .controller('ContactController', ControllerController);

    ControllerController.$inject = ['clientConstant', '$location', 'ContactService'];
    function ControllerController(clientConstant, $location, ContactService) {
        var vm = this;
        vm.letter = {};
        vm.alertSuccess = false;
        vm.alertFail = false;
        vm.alertMsg = '';
        vm.submitLetter = submitLetter;
        vm.canNotSubmit = canNotSubmit;

        activate();

        ////////////////
        function activate() { 

        };

        function submitLetter() {
            var isCapchaChecked;
            if(window.grecaptcha) {
              isCapchaChecked = window.grecaptcha.getResponse(window.foodtechGReCapcha);   
            };
            if(isCapchaChecked) {
                var reqBody = ContactService.getLetterRequest(vm.letter);
                ContactService.submitLetter(reqBody)
                    .then(function(res) {
                        var data = res.data;
                        if(data.success) {
                            vm.alertMsg = data.message;
                            vm.alertSuccess = true;
                            vm.alertFail = false;
                            vm.letter = {};
                        } else {
                            vm.alertMsg = data.message;
                            vm.alertSuccess = false;
                            vm.alertFail = true;
                        }
                    }).catch(function(err) {
                        vm.alertMsg = 'Đã có lỗi xảy ra trong quá trình gửi lời nhắn.';
                        vm.alertSuccess = false;
                        vm.alertFail = true;
                    });
            } else {
                vm.alertMsg = 'Vui lòng xác nhận bạn không phải là người máy tiếp tục gửi lời nhắn nhé. Điều này sẽ giúp chúng tôi ngăn chặn việc spam tin nhắn.';
                vm.alertSuccess = false;
                vm.alertFail = true;
            }
        };

        function canNotSubmit() {
          return !(vm.letter.name && vm.letter.email && vm.letter.message);  
        };

    }
})();