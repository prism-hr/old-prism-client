const conf = require('./gulp.conf');
var proxyMiddleware = require('http-proxy-middleware');

module.exports = function () {
    return {
        server: {
            baseDir: [
                conf.paths.tmp,
                conf.paths.src
            ]
        },
        open: false,
        port: 9000,
        middleware: proxyMiddleware('/prism/api', {
            target: 'http://local.prism.ucl.ac.uk:8080/',
            changeOrigin: true
        })
    };
};
