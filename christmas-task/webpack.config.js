const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'assets/img/[name][ext][query]',
                }
            },
            {
                test: /\.(?:svg)$/i,
                type: 'asset/resource',
                generator : {
                  filename : 'assets/svg/[name][ext][query]',
                }
            },
            {
              test: /\.(?:mp3|wav|ogg|mp4)$/i,
              type: 'asset/resource',
              generator : {
                filename : 'assets/audio/[name][ext][query]',
              }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: '[file]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin()
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};