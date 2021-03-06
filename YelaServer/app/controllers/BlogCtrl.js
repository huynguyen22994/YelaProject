var models = require('../models');
var async = require('async');
var _ = require('underscore');

module.exports.getBlogs = (req, res, next) => {
    models.Blog.findAndCountAll()
        .then((result) => {
            let responses = {
                count: result.count,
                blogs: []
            }
            result.rows.forEach((blog) => {
                responses.blogs.push(blog.dataValues);
            });
            res.json(responses);
        },
        (err) => {
            console.log(err);
        })
};

module.exports.createBlog = (req, res, next) => {
    var blog = req.body;
    if (blog) {
        models.Blog.create({
            title: blog.title,
            description: blog.description,
            imageLink: blog.imageLink,
            summary: blog.summary,
            type: blog.type,
            urlKey: blog.urlKey
        }).then((result) => {
            res.end("insert success");
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.updateBlog = (req, res, next) => {
    var blog = req.body;
    if (blog) {
        models.Blog.update(
            {
                title: blog.title,
                description: blog.description,
                imageLink: blog.imageLink,
                summary: blog.summary,
                type: blog.type,
                urlKey: blog.urlKey
            },
            {
                where: {
                    blogId: blog.blogId
                }
            }
        ).then((result) => {
            res.end(JSON.stringify(result));
        }, (err) => {
            res.statusCode = 400;
            res.end();
        })
    } else {
        res.statusCode = 400;
        res.end()
    }
};

module.exports.deleteBlog = (req, res, next) => {
    var blogId = req.query.blogId;
    var imageLink = req.query.imageLink;
    if (blogId) {
        models.Blog.destroy({
            where: {
                blogId: blogId
            }
        }, {
            force: true    
        }).then((result) => {
            if (result == 0) {
                res.statusCode = 400;
                res.end();
            } else {
                if (imageLink) {
                    fs.unlinkSync(imageLink);
                }
                res.end("delete success");
            }
        }, (err) => {
            res.statusCode = 400;
            res.end(); 
        })
    } else {
        res.statusCode = 400;
        res.end()
    }
};

module.exports.getOneBlog = (req, res, next) => {
    var blogId = req.query.blogId;
    if (blogId) {
        models.Blog.findById(blogId)
            .then((result) => {
                res.end(JSON.stringify(result));
            }, (err) => {
                res.statusCode = 400;
                res.end()
            });
    } else {
        res.statusCode = 400;
        res.end();
    }
};

module.exports.getOneBlogByUrl = (req, res, next) => {
    var urlKey = req.query.urlKey;
    if (urlKey) {
        models.Blog.findAll({
            where: {
                urlKey: urlKey
            }
        })
        .then((result) => {
            if(Array.isArray(result)) {
                res.end(JSON.stringify(result[0]));
            } else {
                res.end(JSON.stringify(result));
            }
        }, (err) => {
            res.statusCode = 400;
            res.end()
        });
    } else {
        res.statusCode = 400;
        res.end();
    }
};


module.exports.getBlogsByType = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    var type = req.query.type;
    models.Blog.findAndCountAll({
    where: {
        type: type
    },
    offset: offset,
    limit: limit
    })
    .then((result) => {
        res.json(result);
    }, (err) => {
        res.statusCode = 400;
        res.end();
    });
};

module.exports.getBlogByPaging = (req, res, next) => {
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    models.Blog.findAndCountAll({
        offset: offset,
        limit: limit
    })
    .then((result) => {
        let responses = {
            count: result.count,
            blogs: []
        }
        result.rows.forEach((blog) => {
            responses.blogs.push(blog.dataValues);
        });
        res.json(responses);
    },
    (err) => {
        console.log(err);
    })
};