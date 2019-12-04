module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: []
    },
    production: {
      plugins: ["transform-remove-console"]
    }
  },
  plugins: [
    ["module-resolver", {
      root: ["./src/"],
      extensions: [
        ".ios.js",
        ".android.js",
        ".js"
      ],
      alias: {
        assets: "./src/assets",
        cfg: "./src/cfg",
        components: "./src/ui/components",
        contexts: "./src/contexts",
        expo: "./src/expo",
        flow: "./src/flow",
        fonts: "./src/assets/fonts",
        fragments: "./src/ui/fragments",
        images: "./src/assets/images",
        lib: "./src/lib",
        localize: "./src/localize",
        screens: "./src/ui/screens",
        underscore: "lodash"
      }
    }],
    ["@babel/plugin-proposal-export-namespace-from"],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-transform-flow-strip-types"]
  ]
};
