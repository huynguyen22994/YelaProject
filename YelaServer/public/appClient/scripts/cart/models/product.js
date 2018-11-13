(function() {
    'use strict';

    angular
        .module('YelaAppClient.Product', [])
        .factory('Product', Service);

    Service.$inject = [];
    function Service() {

        function Product(id, name, price, linkImg) {
            this._id = id;
            this.productId = id;
            this.name = name;
            this.price = price;
            this.linkImg = linkImg;
            this.contructor = Product;
        }

        Product.prototype = {
            getPrice: getPrice,
            setName: setName,
            setPrice: setPrice 
        }
        
        return Product;

        ////////////////

        function getPrice() {
            return parseInt(this.price);
        }

        function setName(name) {
            this.name = name;
            return this;
        }

        function setPrice(price) {
            this.price = price;
            return this;
        }

    }
})();