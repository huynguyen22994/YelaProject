app.factory('HomeService', function ($http, apis) {

    var getCategories = () => {
        return $http({
            method: 'GET',
            url: apis.getCategories
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    var getProductTypebycategoryId = (categoryId) => {
        return $http({
            method: 'GET',
            url: apis.getProductTypebycategoryId,
            params: {
                categoryId: categoryId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var getProductFreature = () => {
        return $http({
            method: 'GET',
            url: '/api/productfreatures'
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    var getBrands = () => {
        return $http({
            method: 'GET',
            url: '/api/brand'
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var getProductNew = (offset) => {
        return $http({
            method: 'GET',
            url: '/api/productnew',
            params: {
                offset: offset
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var getProductBestseller = (offset) => {
        return $http({
            method: 'GET',
            url: '/api/productbestseller',
            params: {
                offset: offset
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var getSliderEnable = () => {
        return $http({
            method: 'GET',
            url: '/api/slider/enable'
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    return {
        getCategories: getCategories,
        getProductTypebycategoryId: getProductTypebycategoryId,
        getProductFreature: getProductFreature,
        getBrands: getBrands,
        getProductNew: getProductNew,
        getProductBestseller: getProductBestseller,
        getSliderEnable: getSliderEnable
    };
});

app.factory('DetailService', function ($http, apis) {

    var getProductBrandProTypeByProductId = (productId) => {
        return $http({
            method: 'GET',
            url: '/api/product/brand/producttype/one',
            params: {
                productId: productId
            }
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    return {
        getProductBrandProTypeByProductId: getProductBrandProTypeByProductId
    };
});

app.factory('LoginService', function ($http, apis) {

    var createCustomer = (customer) => {
        return $http({
            method: 'POST',
            url: '/api/customer',
            data: customer
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    var emailAuthentication = (emailCustomer) => {
        return $http({
            method: 'GET',
            url: '/api/email/authentication',
            params: {
                email: emailCustomer
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var loginCustomer = (login) => {
        return $http({
            method: 'POST',
            url: 'api/customer/login',
            data: login
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        })
    };

    var logout = () => {
        return $http({
            method: 'GET',
            url: 'api/customer/logout'
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var loginGoogleFacebook = (customer) => {
        return $http({
            method: 'POST',
            url: 'api/customer/login/google/facebook',
            data: customer
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    return {
        createCustomer: createCustomer,
        emailAuthentication: emailAuthentication,
        loginCustomer: loginCustomer,
        logout: logout,
        loginGoogleFacebook: loginGoogleFacebook
    };
});