var webpack = require('webpack');
var path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    //entry: "./src/main.tsx",
    entry: [
        "./src/index.ts"
    ],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, './lib'),
        library: 'skong-react-ui',
        umdNamedDefine:true,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader?configFileName=tsconfig.publish.json' },
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
        plugins: [
            new CheckerPlugin()
        ]
    },

    //https://webpack.github.io/docs/configuration.html#externals
    "externals": [
        // /^react\/lib\/.+/,  // any require that refers to internal react modules
        // /^react-dom\/lib\/.+/, // any require that refers to internal react modules
        {
            "react": "umd react",
            "react-dom": "umd react",
            "three": "THREE"
        }
    ]

};