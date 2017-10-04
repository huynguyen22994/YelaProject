app.controller('LoginCtrl', function($scope, LoginService, $window){
    $scope.newCustomer = {};
    $scope.showAuthentication = false;
    $scope.login = {};

    $scope.register = () => {
        if ($scope.Code == $scope.authenticationCode) {
            $scope.newCustomer.loginType = 'yela';
            LoginService.createCustomer($scope.newCustomer)
                .then((res) => {
                    $window.location.href = '/';
                }, (err) => {

                });
        } else {
            console.log('err')
        }
    };

    $scope.Authentication = () => {
        $scope.loading = true;
        LoginService.emailAuthentication($scope.newCustomer.email)
            .then((res) => {
                console.log(res);
                if (res.status == 400 && res.data.code == 'EENVELOPE') {
                    $scope.emailWrong = true;
                    $scope.emailExists = false;
                    $scope.loading = false;
                } else if (res.status == 400 && res.data.err == 'Email already exists') {
                    $scope.emailExists = true;
                    $scope.emailWrong = false;
                    $scope.loading = false;
                } else {
                    $scope.authenticationCode = res.data.code;
                    $scope.showAuthentication = true;
                    $scope.loading = false;
                }
            }, (err) => {

            })
    };

    $scope.loginCustomer = () => {
        LoginService.loginCustomer($scope.login)
            .then((res) => {
                console.log(res);
                console.log('sdfdsf');
                if (res.status == 400 && res.data.err == "account is not exist") {
                    $scope.errLogin = true;
                    $scope.errLoginGoogle = false;
                } else {
                    sessionStorage.token = res.data.token;
                    $scope.loadSessionCurrent();
                    $scope.errLogin = false;
                    $window.location.href = '/';
                }
            }, (err) => {

            })
    };

    $scope.onGoogleLogin = function () {
        if ($scope.customerLogined === false) {
            var params = {
                'clientid': '725396331747-p277f82p7vggesl5to9bdbs9f390o6b2.apps.googleusercontent.com',
                'cookiepolicy': 'single_host_origin',
                'callback': function (result) {
                    if (result['status']['signed_in']) {
                        var request = gapi.client.plus.people.get(
                            {
                                'userId': 'me'
                            }
                        );
                        request.execute(function (resp) {
                            $scope.$apply(function () {
                                console.log(resp);
                                var googleCustomer = {
                                    lastName: resp.name.familyName,
                                    firstName: resp.name.givenName,
                                    email: resp.emails[0].value,
                                    password: 'ggl',
                                    avatarLink: resp.image.url,
                                    loginType: 'google',
                                    gender: resp.gender
                                };
                                LoginService.loginGoogleFacebook(googleCustomer)
                                    .then((res) => {
                                        if (res.status == 400 && res.data.err == "email or password wrong") {
                                            // email đã tồn tại và phải nhập mật khẩu
                                            //code here
                                            console.log('email đã tồn tại và phải nhập mật khẩu');
                                            $scope.errLoginGoogle = true;
                                            $scope.errLogin = false;
                                        } else {
                                            sessionStorage.token = res.data.token;
                                            $scope.loadSessionCurrent();
                                            $window.location.href = '/';
                                        }
                                    }, (err) => {

                                    });
                                // $scope.gmail.username = resp.displayName;
                                // $scope.gmail.email = resp.emails[0].value;
                                // $scope.g_image = resp.image.url;
                                // online = true;
                                // $scope.caret = 'caret';
                                // $scope.online = true;
                                // addCustomer(HelloWorld.Customers(), $scope.gmail.username, $scope.gmail.email, $scope.g_image)
                            });
                        });
                    }
                },
                'approvalprompt': 'force',
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
            };
            gapi.auth.signIn(params);
        } else {
            alert('Moi ban dang xuat');
        }
    };
    
});