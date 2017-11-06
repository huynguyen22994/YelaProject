var express = require('express');
var app = express();
var http = require('http').createServer(app);
var proxy = require('http-proxy-middleware');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');

var proxyConfig = {
    target: 'http://localhost:3000'
}

//var proxyContent = ['api']; // add something

var jsonPlaceholderProxy = proxy({
    target: process.argv[2] || proxyConfig.target,
    changeOrigin: true,
    ws: true, //enable proxy web socket
    logLevel: 'debug',
    secure: false
});

app.set('port', process.env.PORT || 8080);

app.use(cookieParser());
app.use('/', express.static(__dirname + '/appClient'));
app.use('/admin', express.static(__dirname + '/appAdmin'));
app.use('/bower_components', express.static(__dirname + '/bower_components'))


app.use('/api', jsonPlaceholderProxy);

http.listen(app.get('port'), () => {
    console.log(`link: http://localhost:${app.get('port')}/api/... => Apis of YelaApp`);
    console.log(`link: ${process.argv[2] || proxyConfig.target}/docs => Document Apis of YelaApp`);
    console.log(`link: ${process.argv[2] || proxyConfig.target}/api-docs => Resource Listing JSON of Swagger Server`)
});
require('opn')(`http://localhost:${app.get('port')}`)

exports = module.exports = app;