
const HtmlWebPackPlugin = require('html-webpack-plugin'); //para estilos dinamicos de los componentes
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //para estilos globales
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //minimizar css
const CopyPlugin = require('copy-webpack-plugin'); //carpetas con contenido estatico (imagenes)
const MinifyPlugin = require("babel-minify-webpack-plugin");//minimizar js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {

    mode: 'production',    //indica que es desarrollo - production para produccion
    optimization:{ //minimizar css
        minimizer:[new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contentHash].js'
    },
    module: {
        rules: [
            //Estilos dinamicos, debo hacer import en el componente js
            {
                test: /\.scss$/,  
                exclude: /styles\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    "sass-loader"
                ]
            },
            //Estilos globaes
            {
                test: /styles\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false //tue minimiza el html
                }                
            },
            //babel
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    plugins: [
        //estilos dinamicos
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        //estilos globales
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        //carpetas con contenido estatico (imagenes)
        new CopyPlugin({
            patterns: [
            {from:'src/assets', to:'assets/'}]
        }),
        //minimizar js
        new MinifyPlugin(),
        //eliminar dist automaticamente
        new CleanWebpackPlugin()
    ]

}