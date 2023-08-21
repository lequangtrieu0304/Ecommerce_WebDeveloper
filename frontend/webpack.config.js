const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './../frontend')
        },
        open: true,
        port: 8080,
        hot: true
    },
    mode: 'development'
}