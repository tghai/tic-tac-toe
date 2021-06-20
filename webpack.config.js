const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/Index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
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
};
