const withPlugins = require("next-compose-plugins");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

const lessThemeVariablesFilePath = "./styles/ant-theme-variables.less";

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, lessThemeVariablesFilePath), "utf8")
);

const lessNextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }

    config.resolve.alias["@"] = path.resolve(__dirname);

    return config;
  },
};

const sassNextConfig = {
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: "[path]___[local]___[hash:base64:5]",
  },
};

const cssNextConfig = {
  cssLoaderOptions: {
    url: false,
  },
};

module.exports = withPlugins(
  [
    [withLess, lessNextConfig],
    [withCss, cssNextConfig],
    [withSass, sassNextConfig],
  ],
  {
    webpack5: false,
    env: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  }
);
