(function() {
    'use strict';

    angular
        .module('YelaApp')
        .service('apis', apis);

    apis.$inject = ['config'];
    function apis(config) {
        // Products
        this.getProducts = config.baseUrl + '/api/products';
        this.createProduct = config.baseUrl + '/api/products';
        this.getOneProduct = config.baseUrl + '/api/product/one';
        this.updateProduct = config.baseUrl + '/api/products';
        this.deleteProduct = config.baseUrl + '/api/products';
        this.getProductFreature = config.baseUrl + '/api/productfreatures';
        this.getProductBrandProTypeByProductId = config.baseUrl + '/api/product/brand/producttype/one';

        // Categories
        this.getCategories = config.baseUrl + '/api/category';
        this.createCategory = config.baseUrl + '/api/category';
        this.updateCategory = config.baseUrl + '/api/category';
        this.deleteCategory = config.baseUrl + '/api/category';
        this.getOneCategory = config.baseUrl + '/api/category/one';

        // Product Type
        this.getProductTypes = config.baseUrl + '/api/producttype';
        this.getOneProductType = config.baseUrl + '/api/producttype/one';
        this.createProductType = config.baseUrl + '/api/producttype';
        this.updateProductType = config.baseUrl + '/api/producttype';
        this.deleteProductType = config.baseUrl + '/api/producttype';
        this.getProductTypebycategoryId = config.baseUrl + '/api/producttype/category/id';

        // Customer
        this.createCustomer = config.baseUrl + '/api/customer';

        // UploadFile
        this.uploadProductImg = config.baseUrl + '/api/product/upload';
    }
})();