(function() {
    'use strict';

    angular
        .module('YelaAppClient.Login')
        .factory('Customer', Service);

    Service.$inject = [];
    function Service() {

        function Customer(id, token, firstName, lastName, avatarLink, email) {
            this._id = id;
            this.token = token;
            this.firstName = firstName;
            this.lastName = lastName;
            this.avatarLink = avatarLink;
            this.email = email,
            this.contructor = Customer;
        }

        Customer.prototype = {
            getInfo: getInfo,
            getName: getName,
            getEmail: getEmail,
            getImage: getImage,
            getToken: getToken
        }
        
        return Customer;

        ////////////////

        function getInfo() {
            return angular.copy(this);
        }

        function getName() {
            return this.firstName + this.lastName;
        }

        function getEmail() {
            return this.email;
        }

        function getImage() {
            return this.avatarLink;
        }

        function getToken() {
            return this.token;
        }

    }
})();