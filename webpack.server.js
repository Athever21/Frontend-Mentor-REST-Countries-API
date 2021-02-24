const path = require("path");
const cwd = process.cwd();
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  mode: "production",
  devtool: "source-map",
  entry: [path.join(cwd, "server", "index.ts")],
  output: {
    path: path.join(cwd, "public"),
    filename: "server.js",
    publicPath: "/public/",
  },
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(cwd, "server")],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
