const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/Index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: path.join('bundle.css'),
      chunkFilename: 'bundle.css',
    })
  ],
  module: {
    rules: [
      {
        // string regex that matches all javascripts files in the project directory.
        test: /\.(js|jsx)$/,
        // exclude the node_modules folder.
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // this object is equivalent to babel.config.json file.
            presets: ["@babel/preset-env", "@babel/preset-react"],
            comments: false,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
        ],
      },
    ],
  },
  resolve : {
    extensions : [".jsx" , ".mjs", ".js", ".css"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true,
    liveReload: true,
    historyApiFallback : true
  },
  devtool : 'eval-cheap-module-source-map'
};
