(function() {
    'use strict';

    angular
        .module('CustomerModel', [])
        .factory('Customer', Service);

    Service.$inject = [];
    function Service() {

        function Customer(id, token, firstName, lastName, avatarLink, email) {
            this._id = id;
            this.token = token;
            this.firstName = firstName;
            this.lastName = lastName;
            this.avatarLink = avatarLink;
            this.email = email;
            this.contructor = Customer;
        }

        Customer.prototype = {
            getInfo: getInfo,
            getName: getName,
            getEmail: getEmail,
            getImage: getImage,
            getToken: getToken,
            isLogin: isLogin,
            destroy: destroy
        }
        
        return Customer;

        ////////////////

        function getInfo() {
            return angular.copy(this);
        }

        function getName() {
            return this.firstName + ' ' + this.lastName;
        }

        function getEmail() {
            return this.email;
        }

        function getImage() {
            return this.avatarLink ? this.avatarLink : 'images/shop/customer.png';
        }

        function getToken() {
            return this.token;
        }

        function isLogin() {
            if(this.token) {
                return true;
            } else {
                return false;
            }
        }

        function destroy() {
            this._id = null;
            this.token = null;
            this.firstName = null;
            this.lastName = null;
            this.avatarLink = null;
            this.email = null;
            return this;
        }

    }
})();