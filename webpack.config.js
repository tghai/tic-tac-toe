const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  ],
  module: {
    rules: [
      {
        // string regex that matches all javascripts files in the project directory.
        test: /\.(js|jsx)$/,
        // exclude the node_modules folder.
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            // this object is equivalent to babel.config.json file.
            presets: ["@babel/preset-env", "@babel/preset-react"],
            comments: false,
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true,
    liveReload: true,
  },
};
