const path = require("path");
const cwd = process.cwd();
const webpack = require("webpack");

module.exports = {
  name: "browser",
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(cwd, "client", "index.tsx"),
  ],
  output: {
    path: path.join(cwd, "public"),
    filename: "dist.js",
    publicPath: "/public/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [path.resolve(cwd, "client")],
      },
      {
        test: /\.scss/,
        include: [path.resolve(cwd, "client")],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    emitOnErrors: false,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
};
