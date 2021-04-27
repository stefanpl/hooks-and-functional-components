module.exports = {
  extends: ["auto"],
  rules: {
    "simple-import-sort/imports": "off",
    "react/destructuring-assignment": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-reduce": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "unicorn/prefer-module": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  ],
};
