module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "airbnb-base",
    'plugin:@typescript-eslint/eslint-recommended',
    "plugin:react/recommended"
  ],
  rules: {
    quotes: ["error", "single"],
      "import/extensions": [
        "error",
        "ignorePackages",
        { js: "never", jsx: "never", ts: "never", tsx: "never", json: "never" },
      ],
    },
    settings: {
      "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } },
  },
};
