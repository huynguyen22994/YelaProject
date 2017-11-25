(function() {
    'use strict';

    angular
        .module('YelaAppClient.Home')
        .controller('HomeController', ControllerController);

    ControllerController.$inject = ['HomeService'];
    function ControllerController(HomeService) {
        var vm = this;

        activate();

        ////////////////

        async function activate() {
            vm.productFreatures = await loadProductFreatures();
            vm.productNews = await loadProductNews();
            vm.productBestsellers = await loadProductBestsellers();
         };

        function loadProductFreatures() {
            return new Promise((resolve, reject) => {
                HomeService.getProductFreatures()
                    .then(function (productFreatures) {
                        resolve(productFreatures.data.rows);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductNews() {
            return new Promise((resolve, reject) => {
                HomeService.getProductNews()
                    .then(function (productNews) {
                        resolve(productNews.data.rows);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };

        function loadProductBestsellers() {
            return new Promise((resolve, reject) => {
                HomeService.getProductBestsellers()
                    .then(function (productBestsellers) {
                        resolve(productBestsellers.data.rows);
                    }).catch(function (err) {
                        console.log(err);
                        reject(err);
                    });
            });
        };
        
    }
})();