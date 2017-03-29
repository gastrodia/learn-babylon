var express = require('express');
var path = require('path');
var app = express();


var dev_config = {
    port:3000, 
    env:'dev', 
    reload:true 
};


var path = require('path');
var chokidar = require('chokidar');
var DtsCreator = require('typed-css-modules');

chokidar.watch('src', {persistent: true}).on('all', (event, file) => {
    if (path.extname(file) == '.css') {
        let creator = new DtsCreator();
        creator.create(file).then(content => {
            // console.log(content.tokens);          // ['myClass']
            // console.log(content.formatted);       // 'export const myClass: string;'
            content.writeFile();                  // writes this content to "src/style.css.d.ts"
            console.log(file + '.d.ts  ' + 'updated!')
        });
    }
});

// static assets served by webpack-dev-middleware & webpack-hot-middleware for development
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: false,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

// render index.html
var ejs = require('ejs');
var fs = require('fs');
app.get('/',function(req, res) {
     var page = fs.readFileSync('index.html', 'utf-8');
     //console.log(page);
     var html = ejs.render(page, dev_config);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
});

// static server
app.use(express.static(path.join(__dirname, './')));


// add "reload" to express, see: https://www.npmjs.com/package/reload
var reload = require('reload');
var http = require('http');

var server = http.createServer(app);
reload(server, app);

server.listen(dev_config.port, function () {
    console.log('App (dev) is now running on port '  + dev_config.port + '!');
});



