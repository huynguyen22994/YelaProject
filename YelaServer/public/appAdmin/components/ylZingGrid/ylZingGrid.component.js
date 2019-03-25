(function(){
    "use strict";

    angular.module("ylZingGrid", [])
    .component('ylZingGrid', {
        template: '',
        bindings: { 
            config: '=',
            data: '=' 
        },
        controller: MyController
      });
      
      function MyController($scope, $element, $attrs, $timeout) {
        var that = this;
        // if(!this.data && !this.config) {
        //   return
        // }

          $scope.$evalAsync(() => {
            const zgRef = document.createElement('zing-grid');
  
            if(that.config) {
              if(that.config.caption) {
                zgRef.setAttribute('caption', that.config.caption);
              }
              if(that.config.id) {
                zgRef.setAttribute('id', that.config.id);
              }
              if(that.config.class) {
                zgRef.setAttribute('class', that.config.class);
              }
              if(that.config.editor) {
                zgRef.setAttribute('editor' ,'');
              }
              if(that.config.sorter) {
                zgRef.setAttribute('sorter', '');
              }
              if(that.config.search) {
                zgRef.setAttribute('search', '');
              }
              if(that.config.layout) {
                zgRef.setAttribute('layout', that.config.layout);
              }
              if(that.config.pageSize) {
                zgRef.setAttribute('page-size', that.config.pageSize);
              }
              if(that.config.pageSizeOptions) {
                zgRef.setAttribute('page-size-options', that.config.pageSizeOptions);
              }
              if(that.config.pager) {
                zgRef.setAttribute('pager', '');
              }
              if(that.config.viewportStop) {
                zgRef.setAttribute('viewport-stop', '');
              }
            }
            $timeout(function() {
              zgRef.setAttribute('data', JSON.stringify(that.data));
              $element.append(zgRef);
             }, 300);
          });
      }
})();