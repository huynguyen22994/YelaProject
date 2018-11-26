(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .factory('ylBillNotice', Service);

    Service.$inject = [];
    function Service() {

        function BillNotice() {
            this.bills = [];
            this.total = 0;
            this.contructor = BillNotice;
        }

        BillNotice.prototype = {
            addBill: addBill,
            getBillList: getBillList,
            getBillLength: getBillLength,
            removeBill: removeBill,
            concatBill: concatBill
        }
        
        return BillNotice;

        ////////////////

        function addBill(bill) {
            var isExistList = false;
            for(var i = 0; i < this.bills.length; i++) {
                if(this.bills[i].billId === bill.billId) {
                    isExistList = true;
                }
            }
            if(!isExistList) {
                this.bills.push(bill);
            }
            return this;
        }

        function getBillList() {
            return this.bills;
        }

        function getBillLength() {
            return this.bills.length;
        }

        function removeBill(bill) {
            for(var i = 0; i < this.bills.length; i++) {
                if(this.bills[i]._id === bill._id) {
                    this.bills.splice(i, 1);
                }
            }
            return this;
        }

        function concatBill(bills) {
            this.bills.length = 0;
            if(angular.isArray(bills)) {
                for(var i = 0; i < bills.length; i++) {
                    this.bills.push(bills[i]);
                }
            }
            return this;
        }

    }
})();