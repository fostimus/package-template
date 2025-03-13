const { peerDependencies } = require("./package.json");

const peerDepKeys = Object.keys(peerDependencies || {});

module.exports = {
  extends: ["nicenice"],
  rules: {
    "import/no-unresolved": peerDepKeys.length && [
      "error",
      { ignore: Object.keys(peerDependencies) },
    ],
  },
  plugins: ["prettier"],
  // potential to move this into eslint-config-nice-nice
  parserOptions: {
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  settings: {
    "import/resolver": {
      alias: [
        // eslint-plugin-import doesn't support the exports package.json key
        // When the fix for this issue is in, we can remove this alias:
        // https://github.com/import-js/eslint-plugin-import/issues/1810
        ["@anvilco-pkg/ui", "./node_modules/@anvilco-pkg/ui/dist"],
      ],
    },
  },
};
