(function() {
    'use strict';
    angular
        .module('Resize', [])
        .directive('resize', resizeFunction);

    function resizeFunction($window) {
        return {
            link: link,
            restrict: 'A'
        };

        function link(scope, element, attrs){

            scope.width = $window.innerWidth;

            function onResize() {
                if (scope.width !== $window.innerWidth) {
                    scope.width = $window.innerWidth;
                    scope.$digest();
                }
            };

            function cleanUp() {
                angular.element($window).off('resize', onResize);
            };

            angular.element($window).on('resize', onResize);

            scope.$on('$destroy', cleanUp);

        };
    };
})();