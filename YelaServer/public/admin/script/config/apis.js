app.service('apis', function (config) {
    // Products
    this.getProducts = config.baseUrl + '/api/products';
    this.createProduct = config.baseUrl + '/api/products';
    this.getOneProduct = config.baseUrl + '/api/product/one';
    this.updateProduct = config.baseUrl + '/api/products';
    this.deleteProduct = config.baseUrl + '/api/products';

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
    
    // Brand
    this.getBrands = config.baseUrl + '/api/brand';
    this.createBrand = config.baseUrl + '/api/brand';
    this.updateBrand = config.baseUrl + '/api/brand';
    this.deleteBrand = config.baseUrl + '/api/brand';
    this.getOneBrand = config.baseUrl + '/api/brand/one';

    // Slider
    this.deleteSlider = config.baseUrl + '/api/slider';
    this.getSliders = config.baseUrl + '/api/slider';
    this.getOneSlider = config.baseUrl + '/api/slider/one';
    this.createSlider = config.baseUrl + '/api/slider';
    
    // UploadFile
    this.uploadProductImg = config.baseUrl + '/api/product/upload';
    this.uploadSliderImg = config.baseUrl + '/api/slider/upload';
});