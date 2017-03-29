var webpack = require('webpack');
var path = require('path');
var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    //entry: "./src/main.tsx",
    entry: [
        "./src/main.tsx",
        hotMiddlewareScript
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './dist'),
        publicPath: publicPath,
        library: 'skong-react-ui',
        libraryTarget: "umd"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.css$/,
                loaders: [
                    'style?sourceMap',
                    'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            },
            {
                // 小于8KB的图片使用base64内联
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=40000'
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    //https://webpack.github.io/docs/configuration.html#externals
    "externals": [
        // /^react\/lib\/.+/,  // any require that refers to internal react modules
        // /^react-dom\/lib\/.+/, // any require that refers to internal react modules
        {
            // "react": "React",
            // "react-dom": "ReactDOM",
            "three": "THREE"
        }
    ]

};