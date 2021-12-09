const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test: /\.s[ac]ss$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
      new MiniCssExtractPlugin({ filename: '[contenthash].css' }),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/index.html'),
          filename: 'index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
            {
                context: path.resolve(__dirname, 'src'),
                from: 'assets/**',
                to: path.resolve(__dirname, 'dist')        
            }
        ]}),
      new CleanWebpackPlugin()
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};