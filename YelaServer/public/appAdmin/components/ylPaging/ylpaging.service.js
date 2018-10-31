(function() {
    'use strict';
    angular
    .module('YlPaging')
    .factory('PagerService', PagerService);

    function PagerService() {
        var service = {};

        service.getPager = getPager;

        return service;

        function range(a, b, step){
            var A= [];
            if(typeof a== 'number'){
                A[0]= a;
                step= step || 1;
                while(a+step<= b){
                    A[A.length]= a+= step;
                }
            }
            else{
                var s= 'abcdefghijklmnopqrstuvwxyz';
                if(a=== a.toUpperCase()){
                    b=b.toUpperCase();
                    s= s.toUpperCase();
                }
                s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
                A= s.split('');        
            }
            return A;
        };

        function getPager(totalItems, currentPage = 1, pageSize = 11) {
                
            if(typeof pageSize === 'string') {
                pageSize = parseInt(pageSize);
            }

            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if(totalPages <= 5) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if(currentPage <= 3) {
                    startPage = 1;
                    endPage = 5;
                } else if (currentPage + 2 >= totalPages) {
                    startPage = totalPages - 4;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 2;
                    endPage = currentPage + 2;
                }
            }

            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize, totalItems);

            var pages = range(startPage, endPage);

            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        };
    };
})();   