const path = require("path");
const cwd = process.cwd();

module.exports = {
  name: "browser",
  mode: "development",
  entry: [path.join(cwd, "client", "index.tsx")],
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
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
