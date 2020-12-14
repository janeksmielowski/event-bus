const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { ProgressPlugin } = require('webpack');

module.exports = function(env, argv) {
    return {
        mode: argv.mode,
        entry: path.resolve(__dirname, 'src/index.tsx'),
        output: {
            filename: 'index.js',
            library: 'JeyzEventBus',
            libraryTarget: 'umd',
            path: path.resolve(__dirname, 'dist'),
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        plugins: [
            new ProgressPlugin(),
            new ESLintPlugin({
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }),
            new CleanWebpackPlugin()
        ]
    };
}