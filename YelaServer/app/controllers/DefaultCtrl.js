var ProductCtrl = require('./ProductCtrl');
var CategoryCtrl = require('./CategoryCtrl');
var ProductTypeCtrl = require('./ProductTypeCtrl');
var CustomerCtrl = require('./CustomerCtrl');
var LoginCtrl = require('./LoginCtrl');
var BrandCtrl = require('./BrandCtrl');
var SliderCtrl = require('./SliderCtrl');
var BlogCtrl = require('./BlogCtrl');
var AdministratorCtrl = require('./AdministratorCtrl');
var Bill = require('./BillCtrl');
var async = require('async');

// Products
module.exports.getProducts = (req, res, next) => {
    ProductCtrl.getProducts(req, res, next);
};

module.exports.createProduct = (req, res, next) => {
    ProductCtrl.createProduct(req, res, next);
};

module.exports.updateProduct = (req, res, next) => {
    ProductCtrl.updateProduct(req, res, next);
};

module.exports.deleteProduct = (req, res, next) => {
    ProductCtrl.deleteProduct(req, res, next);
};

module.exports.getOneProduct = (req, res, next) => {
    ProductCtrl.getOneProduct(req, res, next);
};

module.exports.getProductFreature = (req, res, next) => {
    ProductCtrl.getProductFreature(req, res, next);
};

module.exports.getProductNew = (req, res, next) => {
    ProductCtrl.getProductNew(req, res, next);
};

module.exports.getProductBestseller = (req, res, next) => {
    ProductCtrl.getProductBestseller(req, res, next);
};

module.exports.getProductBrandProTypeByProductId = (req, res, next) => {
    ProductCtrl.getProductBrandProTypeByProductId(req, res, next);
};

module.exports.searchProduct = (req, res, next) => {
    ProductCtrl.searchProduct(req, res, next);
};

module.exports.getProductWithOffset = (req, res, next) => {
    ProductCtrl.getProductWithOffset(req, res, next);
};

module.exports.getProductByProductType = (req, res, next) => {
    ProductCtrl.getProductByProductType(req, res, next);
};

module.exports.getProductByType = (req, res, next) => {
    ProductCtrl.getProductByType(req, res, next);
};

// Categories
module.exports.getCategory = (req, res, next) => {
    CategoryCtrl.getCategory(req, res, next);
};

module.exports.createCategory = (req, res, next) => {
    CategoryCtrl.createCategory(req, res, next);
};

module.exports.updateCategory = (req, res, next) => {
    CategoryCtrl.updateCategory(req, res, next);
};

module.exports.getOneCategory = (req, res, next) => {
    CategoryCtrl.getOneCategory(req, res, next);
};

module.exports.deleteCategory = (req, res, next) => {
    CategoryCtrl.deleteCategory(req, res, next);
};

module.exports.getCategoryProductTye = (req, res, next) => {
    CategoryCtrl.getCategoryProductTye(req, res, next);
};

// Product Type
module.exports.getProductType = (req, res, next) => {
    ProductTypeCtrl.getProductType(req, res, next);
};

module.exports.createProductType = (req, res, next) => {
    ProductTypeCtrl.createProductType(req, res, next);
};

module.exports.updateProductType = (req, res, next) => {
    ProductTypeCtrl.updateProductType(req, res, next);
};

module.exports.deleteProductType = (req, res, next) => {
    ProductTypeCtrl.deleteProductType(req, res, next);
};

module.exports.getOneProductType = (req, res, next) => {
    ProductTypeCtrl.getOneProductType(req, res, next);
};

module.exports.getProductTypebyCategoryId = (req, res, next) => {
    ProductTypeCtrl.getProductTypebyCategoryId(req, res, next);
};

module.exports.searchProductType = (req, res, next) => {
    ProductTypeCtrl.searchProductType(req, res, next);
};

// Customer
module.exports.createCustomer = (req, res, next) => {
    CustomerCtrl.createCustomer(req, res, next);
};

// Email authentication
module.exports.emailAuthentication = (req, res, next) => {
    var customerEmail = req.query.email;
    async.parallel({
        checkEmail: (callback) => {
            CustomerCtrl.checkEmail(customerEmail, callback);
        }
    }, (err, result) => {
        if (err) {
            res.statusCode = 400;
            var respnses = {
                err: err
            }
            res.end(JSON.stringify(respnses));
        } else {
            if (result.checkEmail) {
                LoginCtrl.emailAuthentication(req, res, next);
            }
        }
    });
};

module.exports.loginCustomer = (req, res, next) => {
    LoginCtrl.loginCustomer(req, res, next);
};

module.exports.logoutCustomer = (req, res, next) => {
    LoginCtrl.logoutCustomer(req, res, next);
};

module.exports.loginGoogleFacebook = (req, res, next) => {
    LoginCtrl.loginGoogleFacebook(req, res, next);
};

// Brand
module.exports.getBrands = (req, res, next) => {
    BrandCtrl.getBrands(req, res, next);
};

module.exports.createBrand = (req, res, next) => {
    BrandCtrl.createBrand(req, res, next);
};

module.exports.updateBrand = (req, res, next) => {
    BrandCtrl.updateBrand(req, res, next);
};

module.exports.getOneBrand = (req, res, next) => {
    BrandCtrl.getOneBrand(req, res, next);
};

module.exports.deleteBrand = (req, res, next) => {
    BrandCtrl.deleteBrand(req, res, next);
};

module.exports.getBrandProduct = (req, res, next) => {
    BrandCtrl.getBrandProduct(req, res, next);
};

// Slider
module.exports.getSliders = (req, res, next) => {
    SliderCtrl.getSliders(req, res, next);
};

module.exports.createSilder = (req, res, next) => {
    SliderCtrl.createSilder(req, res, next);
};

module.exports.updateSilder = (req, res, next) => {
    SliderCtrl.updateSilder(req, res, next);
};

module.exports.getOneSilder = (req, res, next) => {
    SliderCtrl.getOneSilder(req, res, next);
};

module.exports.deleteSlider = (req, res, next) => {
    SliderCtrl.deleteSlider(req, res, next);
};

module.exports.getSilderEnable = (req, res, next) => {
    SliderCtrl.getSilderEnable(req, res, next);
};

// Blog
module.exports.getBlogs = (req, res, next) => {
    BlogCtrl.getBlogs(req, res, next);
};

module.exports.createBlog = (req, res, next) => {
    BlogCtrl.createBlog(req, res, next);
};

module.exports.updateBlog = (req, res, next) => {
    BlogCtrl.updateBlog(req, res, next);
};

module.exports.deleteBlog = (req, res, next) => {
    BlogCtrl.deleteBlog(req, res, next);
};

module.exports.getOneBlog = (req, res, next) => {
    BlogCtrl.getOneBlog(req, res, next);
};

module.exports.getBlogsByType = (req, res, next) => {
    BlogCtrl.getBlogsByType(req, res, next);
};

module.exports.getBlogByPaging = (req, res, next) => {
    BlogCtrl.getBlogByPaging(req, res, next);
};

// Administrator
module.exports.loginAdmin = (req, res, next) => {
    AdministratorCtrl.loginAdmin(req, res, next);
};

module.exports.getAdminInfo = (req, res, next) => {
    AdministratorCtrl.getAdminInfo(req, res, next);
};

module.exports.createAdministrator = (req, res, next) => {
    AdministratorCtrl.createAdministrator(req, res, next);
};

// Bill
module.exports.getBills = (req, res, next) => {
    Bill.getBills(req, res, next);
};

module.exports.createBill = (req, res, next) => {
    Bill.createBill(req, res, next);
};

module.exports.updateBill = (req, res, next) => {
    Bill.updateBill(req, res, next);
};

module.exports.getBillByStatus = (req, res, next) => {
    Bill.getBillByStatus(req, res, next);
};