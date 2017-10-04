app.factory('ProductService', function ($http, apis) {

    var getProducts = () => {
        return $http({
            method: 'GET',
            url: apis.getProducts
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    var createProduct = (product) => {
        return $http({
            method: 'POST',
            url: apis.createProduct,
            data: product
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    var getOneProduct = (productId) => {
        return $http({
            method: 'GET',
            url: apis.getOneProduct,
            params: {
                productId: productId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err; 
        });
    };

    var updateProduct = (product) => {
        return $http({
            method: 'PUT',
            url: apis.updateProduct,
            data: product
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var deleteProduct = (productId, linkImg) => {
        return $http({
            method: 'DELETE',
            url: apis.deleteProduct,
            params: {
                productId: productId,
                linkImg: linkImg
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        })
    };

    return {
        getProducts: getProducts,
        createProduct: createProduct,
        getOneProduct: getOneProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct
    }
});

app.factory('CategoryService', function ($http, apis) {

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

    var createCategory = (category) => {
        return $http({
            method: 'POST',
            url: apis.createCategory,
            data: category
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var updateCategory = (category) => {
        console.log(category);
        return $http({
            method: 'PUT',
            url: apis.updateCategory,
            data: category
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var getOneCategory = (categoryId) => {
        return $http({
            method: 'GET',
            url: apis.getOneCategory,
            params: {
                categoryId: categoryId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var deleteCategory = (categoryId) => {
        return $http({
            method: 'DELETE',
            url: apis.deleteCategory,
            params: {
                categoryId: categoryId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        })
    };

    return {
        getCategories: getCategories,
        createCategory: createCategory,
        updateCategory: updateCategory,
        getOneCategory: getOneCategory,
        deleteCategory: deleteCategory
    }
});

app.factory('ProductTypeService', function ($http, apis) {

    var getProductTypes = () => {
        return $http({
            method: 'GET',
            url: apis.getProductTypes,
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var createProductType = (productType) => {
        return $http({
            method: 'POST',
            url: apis.createProductType,
            data: productType
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var updateProductType = (productType) => {
        return $http({
            method: 'PUT',
            url: apis.updateProductType,
            data: productType
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var getOneProductType = (productTypeId) => {
        return $http({
            method: 'GET',
            url: apis.getOneProductType,
            params: {
                productTypeId: productTypeId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var deleteProductType = (productTypeId) => {
        return $http({
            method: 'DELETE',
            url: apis.deleteProductType,
            params: {
                productTypeId: productTypeId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        })
    };

    return {
        getProductTypes: getProductTypes,
        getOneProductType: getOneProductType,
        createProductType: createProductType,
        updateProductType: updateProductType,
        deleteProductType: deleteProductType
    }
});

app.factory('BrandService', function ($http, apis) {

    var getBrands = () => {
        return $http({
            method: 'GET',
            url: apis.getBrands
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var createBrand = (brand) => {
        return $http({
            method: 'POST',
            url: apis.createBrand,
            data: brand
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var updateBrand = (brand) => {
        return $http({
            method: 'PUT',
            url: apis.updateBrand,
            data: brand
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    var getOneBrand = (brandId) => {
        return $http({
            method: 'GET',
            url: apis.getOneBrand,
            params: {
                brandId: brandId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var deleteBrand = (brandId) => {
        return $http({
            method: 'DELETE',
            url: apis.deleteBrand,
            params: {
                brandId: brandId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        })
    };

    return {
        getBrands: getBrands,
        createBrand: createBrand,
        updateBrand: updateBrand,
        getOneBrand: getOneBrand,
        deleteBrand: deleteBrand
    }
});

app.factory('SliderService', function ($http, apis) {

    var getSliders = () => {
        return $http({
            method: 'GET',
            url: apis.getSliders
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        });
    };

    var createSlider = (slider) => {
        return $http({
            method: 'POST',
            url: apis.createSlider,
            data: slider
        }).then((res) => {
            return res;
        },
        (err) => {
            return err;
        })
    };

    // var updateCategory = (category) => {
    //     console.log(category);
    //     return $http({
    //         method: 'PUT',
    //         url: apis.updateCategory,
    //         data: category
    //     }).then((res) => {
    //         return res;
    //     },
    //     (err) => {
    //         return err;
    //     })
    // };

    var getOneSlider = (sliderId) => {
        return $http({
            method: 'GET',
            url: apis.getOneSlider,
            params: {
                sliderId: sliderId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        });
    };

    var deleteSlider = (sliderId) => {
        return $http({
            method: 'DELETE',
            url: apis.deleteSlider,
            params: {
                sliderId: sliderId
            }
        }).then((res) => {
            return res;
        }, (err) => {
            return err;
        })
    };

    return {
        getSliders: getSliders,
        createSlider: createSlider,
        // updateCategory: updateCategory,
        getOneSlider: getOneSlider,
        deleteSlider: deleteSlider
    }
});

app.factory('UploadFile', function ($http, apis, Upload) {

    var uploadProductImg = (file) => {
        return Upload.upload({
            url: apis.uploadProductImg,
            data: {
                file: file
            }
        });
    };

    var uploadSliderImg = (file) => {
        return Upload.upload({
            url: apis.uploadSliderImg,
            data: {
                file: file
            }
        });
    };

    return {
        uploadProductImg: uploadProductImg,
        uploadSliderImg: uploadSliderImg
    }
});