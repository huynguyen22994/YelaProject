app.controller('contactCtrl', function($scope, $http){
    $scope.sendMail = function(){
        $http.post('/contact', $scope.contact).then(function(res){
            console.log(res);
            if(res.status == 200){
                alert('mail thành công');
                refeshContact();
            } else {
                alert('phát sinh sự cố khi gửi mail');
                console.log(res);
            }
        });
    };
    var refeshContact = function(){
        $scope.contact = null;
    }
});