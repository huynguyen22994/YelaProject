(function() {
    'use strict';

    angular
        .module('YelaApp')
        .value('config', config);
    
    var config = {
        baseUrl: 'http://localhost:3000',
        uploadUrl: 'http://localhost:3000/upload/'
    };
        
})();