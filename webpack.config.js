const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (e = {}) => {
  const env = Object.assign({}, process.env, e);
  return {
    entry: "./src/js/entry.js",
    output: {
      path: path.resolve(__dirname, "public/"),
      publicPath: "/",
      filename: "bundle.js",
      chunkFilename: "[name].bundle.js",
      sourceMapFilename: "bundle.map"
    },
    devtool:
      env.NODE_ENV === "production"
        ? "source-map"
        : "cheap-module-eval-source-map",
    module: {
      rules: [
        { test: /\.jsx?$/, loader: "babel-loader" },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1
                }
              },
              "postcss-loader"
            ]
          })
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: "html-loader"
            },
            {
              loader: "markdown-loader",
              options: {
                /* your options here */
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "bundle.css",
        allChunks: true
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
      }),
      new HtmlWebpackPlugin({
        minify: env.NODE_ENV === "production" ? {} : false,
        inject: false,
        templateContent({ htmlWebpackPlugin }) {
          return `
<!DOCTYPE html>
<html lang="en-us">

<head>
  <meta charset="UTF-8">
  <title>Aaron Ballard</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  ${htmlWebpackPlugin.files.css.map(
    f => `<link rel="stylesheet" type="text/css" href="${f}" media="screen">`
  )}
</head>

<body>
  <section class="page-header">
    <h1 class="project-name">Aaron Ballard</h1>
    <h2 class="project-tagline">Javascript Developer, Austin TX</h2>
    <div class="social-wrapper">
      <span class="social-item"><a class="social-link" href="/#/" >About</a></span>
      <span class="social-item social-email">
        <a class="social-link" href="mailto:ans.ballard@gmail.com">
          <span class="fancy-username fancy-email">ans.ballard@gmail.com</span>Email
        </a>
      </span>
      <span class="social-item social-twitter">
        <a class="social-link" target="_blank" href="https://twitter.com/ansballard">
          <span class="fancy-username fancy-twitter">@ansballard</span>Twitter
        </a>
      </span>
      <span class="social-item social-github">
        <a class="social-link" target="_blank" href="https://github.com/ansballard">
          <span class="fancy-username fancy-github">ansballard</span>Github
        </a>
      </span>
      <span class="social-item">
        <a class="social-link" href=/#/projects>Projects
        </a>
      </span>
    </div>
  </section>
  <section class="main-content">
    <div id="domRoot"></div>
  </section>
  ${htmlWebpackPlugin.files.js.map(
    f => `<script type="text/javascript" src="${f}"></script>`
  )}
</body>

</html>`;
        }
      })
    ].concat(
      env.NODE_ENV === "production"
        ? [
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true
            })
          ]
        : []
    )
  };
};
