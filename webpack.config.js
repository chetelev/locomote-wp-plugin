const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const isProduction = mode === "production";

  return {
    entry: "./app.js",
    output: {
      path: isProduction
        ? path.resolve(__dirname, "dist/public")
        : path.resolve(__dirname, "public"),
      filename: "bundle.js",
    },
    mode: mode,
    devtool: isProduction ? "source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            { loader: "css-loader", options: { importLoaders: 1 } },
            { loader: "postcss-loader" },
          ],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
      }),
    ],
  };
};
