(function() {
    'use strict';

    angular
        .module('YelaState', [])
        .factory('StateManagement', Service);

    Service.$inject = ['_'];
    function Service(_) {
        var service = {
            initialize: initialize,
            baseUrl: {
                route: null
            }
        };
        
        return service;

        ////////////////
        function initialize(data, mainState) {
            var state = {
                data: data,
                current: mainState,
                mainState: mainState,
                change: change,
                reset: reset
            };

            function change(stateObj) {
                state.current = stateObj;
            };

            function reset() {
                state.current = state.mainState;
            }
            
            return state;
         }
    }
})();