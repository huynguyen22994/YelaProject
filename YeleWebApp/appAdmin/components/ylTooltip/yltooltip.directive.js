(function() {
    'use strict';
    angular
        .module('YlTooltip', [])
        .directive('tooltip', tooltip);

    function tooltip() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            $(element).hover(onMouseenter, onMouseleave);

            function onMouseenter() {
                $(element).tooltip('show');
            };

            function onMouseleave() {
                $(element).tooltip('hide');
            };
            
        };
        
    };
})();