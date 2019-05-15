(function() {
    'use strict';

    angular
        .module('YelaAppClient.Cart', [])
        .factory('Cart', Service);

    Service.$inject = [];
    function Service() {

        function Cart() {
            this.products = [];
            this.total = 0;
            this.contructor = Cart;
        }

        Cart.prototype = {
            addProduct: addProduct,
            adddProductWithQuatity: adddProductWithQuatity,
            getProductList: getProductList,
            getProductLength: getProductLength,
            removeProduct: removeProduct,
            getTotalPrice: getTotalPrice
        }
        
        return Cart;

        ////////////////

        function addProduct(product) {
            var isExistList = false;
            for(var i = 0; i < this.products.length; i++) {
                if(this.products[i]._id === product._id) {
                    this.products[i].upQuantity();
                    isExistList = true;
                }
            }
            if(!isExistList) {
                this.products.push(product);
            }
            return this;
        }

        function adddProductWithQuatity(product, quatity) {
            var isExistList = false;
            for(var i = 0; i < this.products.length; i++) {
                if(this.products[i]._id === product._id) {
                    if(quatity) {
                        this.products[i].upQuantity(quatity);
                    } else {
                        this.products[i].upQuantity();
                    }
                    isExistList = true;
                }
            }
            if(!isExistList) {
                this.products.push(product);
            }
            return this;
        }

        function getProductList() {
            return this.products;
        }

        function getProductLength() {
            return this.products.length;
        }

        function removeProduct(product) {
            for(var i = 0; i < this.products.length; i++) {
                if(this.products[i]._id === product._id) {
                    this.products.splice(i, 1);
                }
            }
            return this;
        }

        function getTotalPrice() {
            for(var i = 0; i < this.products.length; i++) {
                this.total = this.total + this.products[i].getPrice();
            }
            return this.total;
        }

    }
})();