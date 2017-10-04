app.controller('LoginCtrl', ['$scope', 'HelloWorld', function($scope, HelloWorld, $translate){
    var online = false;
    $scope.caret = "";
    $scope.caret1 = "";
    $scope.online = false;
    //Google
    $scope.gmail = {
        username: "",
        email: ""
    };

    $scope.onGoogleLogin = function(){
        if(online === false){
                var params = {
                    'clientid': '725396331747-p277f82p7vggesl5to9bdbs9f390o6b2.apps.googleusercontent.com',
                    'cookiepolicy': 'single_host_origin',
                    'callback': function(result){
                        if(result['status']['signed_in']){
                            var request = gapi.client.plus.people.get(
                                {
                                    'userId': 'me'
                                }
                            );
                            request.execute(function(resp){
                                $scope.$apply(function(){
                                    $scope.gmail.username = resp.displayName;
                                    $scope.gmail.email = resp.emails[0].value;
                                    $scope.g_image = resp.image.url;   
                                    online = true;   
                                    $scope.caret = 'caret';
                                    $scope.online = true;
                                    addCustomer(HelloWorld.Customers(), $scope.gmail.username, $scope.gmail.email, $scope.g_image)
                                });
                            });
                        }
                    },
                    'approvalprompt': 'force',
                    'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
                };
                gapi.auth.signIn(params);
            }else{
                alert('Moi ban dang xuat');
            }
    }

    $scope.logout = function(){
         $scope.gmail = {
            username: "",
            email: ""
        };
         $scope.facebook = {
            username: "",
            email: ""
        };
        $scope.g_image = "";
        $scope.fb_image = "";
        $scope.caret = "";
        $scope.caret1 = "";
        online = false;
        $scope.online = false;
    }

    //Facebook
     $scope.facebook = {
        username: "",
        email: ""
    };
    $scope.onFBLogin = function(){
        if(online === false){
            FB.login(function(response){
                if(response.authResponse){
                    FB.api('/me', 'GET', {fields: 'email, first_name, name, id, picture'}, function(response){
                        $scope.$apply(function(){
                            $scope.facebook.username = response.name;
                            $scope.facebook.email = response.email;
                            $scope.fb_image = response.picture.data.url;
                            online = true;   
                            $scope.caret1 = 'caret';
                            $scope.online = true;
                            addCustomer(HelloWorld.Customers(), $scope.facebook.username, $scope.facebook.email, $scope.fb_image)
                        });
                    });
                } else {
                    //error
                }
            }, {
                scope: 'email, user_likes',
                return_scopes: true
            });
        }else{
            alert('Moi ban dang xuat');
        }
    }

    var addCustomer = function(Customer, name, email, img){
         $scope.addCustomer = {
                name: '',
                email: '',
                img: ''
            };
            $scope.addCustomer.name = name;
            $scope.addCustomer.email = email;
            $scope.addCustomer.img = img;
            Customer.save($scope.addCustomer, function(){
            alert('addCustomer success');
        });
    };
}]);