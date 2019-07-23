(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .factory('Notify', Service);

    Service.$inject = [];
    function Service() {

        function Notify() {
            this.notices = [];
        }

        Notify.prototype = {
            updateNotifyPackage: updateNotifyPackage,
            getNotifyPackage: getNotifyPackage,
            isHaveNotice: isHaveNotice,
            getNoticeCount: getNoticeCount 
        }
        
        return Notify;

        ////////////////

        function updateNotifyPackage(notifyPackage) {
            var isExisted = false;
            if(notifyPackage) {
                for(var i = 0; i < this.notices.length; i++) {
                    if(this.notices[i].getId() === notifyPackage.getId()) {
                        this.notices[i].updateCount(notifyPackage.getCount());
                        isExisted = true;
                    }
                }
            }
            if(!isExisted) {
                this.notices.push(notifyPackage);
            }
            return this;
        };

        function getNotifyPackage() {
            return this.notices;
        };

        function isHaveNotice() {
            return this.notices.length > 0 ? true : false;
        };

        function getNoticeCount() {
            return this.notices.length; 
        };

    }
})();

(function() {
    'use strict';

    angular
        .module('YelaApplication')
        .factory('NotifyPackage', Service);

    Service.$inject = [];
    function Service() {

        function NotifyPackage(id, count) {
            this.id = id;
            this.count = count;
        }

        NotifyPackage.prototype = {
            getCount: getCount,
            updateCount: updateCount,
            isHaveNotice: isHaveNotice,
            getId: getId,
            putCount: putCount 
        }
        
        return NotifyPackage;

        ////////////////

        function getCount() {
            return this.count;
        }

        function updateCount(count) {
            this.count = count;
            return this;
        }

        function isHaveNotice() {
            return this.count > 0;
        }

        function getId() {
            return this.id;
        }

        function putCount(count) {
            this.count = this.count + count;
            return this;
        }

    }
})();

(function() {
    'use strict';

    angular
        .module('YelaApplication.Statistic')
        .factory('StatisticService', Service);

    Service.$inject = ['$http'];
    function Service($http) {
        var service = {};

        service.api = {
            getAllBillDays: getAllBillDays
        }
        
        return service;
        ////////////////
        function getAllBillDays() {
            return $http({
                url: '/api/billinday',
                method: 'GET'
            }).then(function (res) {
                return res;
            }).catch(function (err) {
                return err;
            });
        };

    }
})();