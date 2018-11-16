(function() {
    'use strict';

    angular
        .module('YelaAppClient.Product', [])
        .factory('Product', Service);

    Service.$inject = [];
    function Service() {

        function Product(id, name, price, linkImg, quantity) {
            this._id = id;
            this.productId = id;
            this.name = name;
            this.price = price;
            this.linkImg = linkImg;
            this.contructor = Product;
            this.quantity = quantity ? quantity : 0;
        }

        Product.prototype = {
            getPrice: getPrice,
            setName: setName,
            setPrice: setPrice,
            upQuantity: upQuantity,
            downQuantity: downQuantity,
            getQuantity: getQuantity,
            getPriceWithQuantity: getPriceWithQuantity
        }
        
        return Product;

        ////////////////

        function getPrice() {
            parseInt(this.price);
            return this.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        }

        function setName(name) {
            this.name = name;
            return this;
        }

        function setPrice(price) {
            this.price = price;
            return this;
        }

        function upQuantity(quantity) {
            this.quantity = quantity ? this.quantity + quantity : this.quantity + 1;
            return this;
        }

        function downQuantity(quantity) {
            this.quantity = quantity ? this.quantity - quantity : this.quantity - 1;
            if(this.quantity < 0) {
                this.quantity = 0;
            }
            return this;
        }

        function getQuantity() {
            return this.quantity;
        }

        function getPriceWithQuantity() {
            return this.price * this.quantity;
        }

    }
})();