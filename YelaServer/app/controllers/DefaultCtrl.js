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
var Authentication = require('../middleware/Authentication');
var LetterCtrl = require('./LetterCtrl');
var CityCtrl = require('./CityCtrl');
var DistrictCtrl = require('./DistrictCtrl');
var ShipCostCtrl = require('./ShipCostCtrl');
var async = require('async');

// Products
module.exports.getProducts = (req, res, next) => {
    ProductCtrl.getProducts(req, res, next);
};

module.exports.createProduct = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, ProductCtrl.createProduct);
};

module.exports.updateProduct = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, ProductCtrl.updateProduct);
};

module.exports.deleteProduct = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, ProductCtrl.deleteProduct);
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
    Authentication.sessionAuthenticationCB(req, res, next, CategoryCtrl.createCategory);
};

module.exports.updateCategory = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, CategoryCtrl.updateCategory);
};

module.exports.getOneCategory = (req, res, next) => {
    CategoryCtrl.getOneCategory(req, res, next);
};

module.exports.deleteCategory = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, CategoryCtrl.deleteCategory);
};

module.exports.getCategoryProductTye = (req, res, next) => {
    CategoryCtrl.getCategoryProductTye(req, res, next);
};

// Product Type
module.exports.getProductType = (req, res, next) => {
    ProductTypeCtrl.getProductType(req, res, next);
};

module.exports.createProductType = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, ProductTypeCtrl.createProductType);
};

module.exports.updateProductType = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, ProductTypeCtrl.updateProductType);
};

module.exports.deleteProductType = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, ProductTypeCtrl.deleteProductType);
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
    Authentication.sessionAuthenticationCB(req, res, next, BrandCtrl.createBrand);
};

module.exports.updateBrand = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, BrandCtrl.updateBrand);
};

module.exports.getOneBrand = (req, res, next) => {
    BrandCtrl.getOneBrand(req, res, next);
};

module.exports.deleteBrand = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, BrandCtrl.deleteBrand);
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
    Authentication.sessionAuthenticationCB(req, res, next, BlogCtrl.createBlog);
};

module.exports.updateBlog = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, BlogCtrl.updateBlog);
};

module.exports.deleteBlog = (req, res, next) => {
    Authentication.sessionAuthenticationCB(req, res, next, BlogCtrl.deleteBlog);
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

module.exports.getOneBlogByUrl = (req, res, next) => {
    BlogCtrl.getOneBlogByUrl(req, res, next);
};

// Administrator
module.exports.loginAdmin = (req, res, next) => {
    AdministratorCtrl.loginAdmin(req, res, next);
};

module.exports.logoutAdmin = (req, res, next) => {
    AdministratorCtrl.logoutAdmin(req, res, next);
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
    Authentication.sessionAuthenticationCB(req, res, next, Bill.updateBill);
};

module.exports.getBillByStatus = (req, res, next) => {
    Bill.getBillByStatus(req, res, next);
};

// Letter
module.exports.testSendMail = (req, res, next) => {
    LetterCtrl.testSendMail(req, res, next);
};

module.exports.getAllLetter = (req, res, next) => {
    LetterCtrl.getAllLetter(req, res, next);
};

module.exports.createLetter = (req, res, next) => {
    LetterCtrl.createLetter(req, res, next);
};

module.exports.deleteLetter = (req, res, next) => {
    LetterCtrl.deleteLetter(req, res, next);
};

// City
module.exports.getAllCity = (req, res, next) => {
    CityCtrl.getAllCity(req, res, next);
};

module.exports.createCity = (req, res, next) => {
    CityCtrl.createCity(req, res, next);
};

module.exports.deleteCity = (req, res, next) => {
    CityCtrl.deleteCity(req, res, next);
};

module.exports.updateCity = (req, res, next) => {
    CityCtrl.updateCity(req, res, next);
};

// District
module.exports.getAllDistrict = (req, res, next) => {
    DistrictCtrl.getAllDistrict(req, res, next);
};

module.exports.createDistrict = (req, res, next) => {
    DistrictCtrl.createDistrict(req, res, next);
};

module.exports.deleteDistrict = (req, res, next) => {
    DistrictCtrl.deleteDistrict(req, res, next);
};

module.exports.updateDistrict = (req, res, next) => {
    DistrictCtrl.updateDistrict(req, res, next);
};

//ShipCostCtrl
module.exports.getAllShipCost = (req, res, next) => {
    ShipCostCtrl.getAllShipCost(req, res, next);
};

module.exports.createShipCost = (req, res, next) => {
    ShipCostCtrl.createShipCost(req, res, next);
};

module.exports.deleteShopCost = (req, res, next) => {
    ShipCostCtrl.deleteShopCost(req, res, next);
};

module.exports.updateShopCost = (req, res, next) => {
    ShipCostCtrl.updateShopCost(req, res, next);
};