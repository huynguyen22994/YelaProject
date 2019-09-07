(function() {
    'use strict';
    angular
        .module('YelaAppClient.Introduce')
        .run(runFunction);
        runFunction.$inject = ['$templateCache'];
        function runFunction($templateCache) {
            $templateCache.put('introduce.html',
                `               
                <div id="contact-page" class="container">
                    <div class="bg">   	
                        <div class="row">  	
                            <div class="col-sm-12">
                                <div class="contact-form">
                                    <h2 class="title text-center">Giới Thiệu</h2>
                                    

                                    
                                </div>
                            </div>  
                            </div>
                        </div>  
                    </div>	
                </div><!--/#contact-page-->
                `
            );
        };
})();