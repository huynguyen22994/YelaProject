var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http').createServer(app);
var socketIO = require('socket.io');
var io = require('socket.io').listen(http);
var swagger = require('swagger-tools');
var fs = require('fs');
var contact = require('./app/routes/contact.js');
var upload = require('./app/controllers/UploadCtrl.js');
var path = require('path');
var parseurl = require('parseurl');
var session = require('express-session');
var config = fs.readFileSync('./config/config.json');
var configDB = JSON.parse(config.toString());
var socket = require('./app/socket/chat.socket.js');
var models = require('./app/models');

app.use(cors());
app.options('*', cors());

app.set('port', process.argv[2] || configDB.port);

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    var views = req.session.views

    if (!views) {
        views = req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    views[pathname] = (views[pathname] || 0) + 1

    next()
});
 app.use('/', express.static(__dirname + '/public/appClient'));
 app.use('/admin', express.static(__dirname + '/public/appAdmin'));
 app.use('/login.html', express.static(__dirname + '/public/appAdmin/login.html'));
 app.use('/client-debug.html', express.static(__dirname + '/public/client'));
 app.use('/admin-debug.html', express.static(__dirname + '/public/admin'));
 app.use('/components', express.static(__dirname + '/public/components'));
 app.use('/bower_components', express.static(__dirname + '/bower_components'));
//  app.use('/upload', express.static(__dirname));
 app.use('/upload', express.static(__dirname + '/upload'));

app.use('/contact', contact);
app.use('/api', upload);

app.get('/admin', function(req, res){
    res.sendFile(path.join(__dirname + '/public/admin/index.html'));
});

var LoadSwagger = () => {
    var root = require('./app/apis/swagger.json');
    var pathFile = path.join(__dirname, '/app/apis/paths');
    var pathfiles = fs.readdirSync(pathFile);
    pathfiles.forEach((file) => {
        var pathJson = require('./app/apis/paths/' + file);
        Object.keys(pathJson.paths)
            .forEach((path) => {
                root.paths[path] = pathJson.paths[path];
            });
    });
    var definitionFile = path.join(__dirname, '/app/apis/definitions');
    var definitionfiles = fs.readdirSync(definitionFile);
    definitionfiles.forEach((file) => {
        var definitionJson = require('./app/apis/definitions/' + file);
        Object.keys(definitionJson.definitions)
            .forEach((definition) => {
                root.definitions[definition] = definitionJson.definitions[definition];
            });
    });
    return root;
};

// swagger
var swaggerObj = LoadSwagger();

var options = {
    swaggerUi: '/swagger.json',
    controllers: __dirname + '/app/controllers'
};

var port = process.env.PORT || app.get('port');

models.sequelize.sync().then(function() {

    swagger.initializeMiddleware(swaggerObj, (middleware) => {
        app.use(middleware.swaggerMetadata());
        app.use(middleware.swaggerSecurity({
            oauth2: function (req, def, scopes, callback) {
            // Do real stuff here
            }
        }));
        app.use(middleware.swaggerRouter(options));
        app.use(middleware.swaggerUi());
    
        http.listen(port,() => {
            console.log(`link: http://localhost:${app.get('port')}/api/... => Apis of DoraemonCare`);
            console.log(`link: http://localhost:${app.get('port')}/docs => Document Apis`);
            console.log(`link: http://localhost:${app.get('port')}/api-docs => Resource Listing JSON`)
        });
    });

});

app.socketClient = socket.initialize(io);

exports = module.exports = app;