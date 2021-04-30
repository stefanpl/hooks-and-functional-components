module.exports = {
  extends: ["auto"],
  rules: {
    "simple-import-sort/imports": "off",
    "react/destructuring-assignment": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-reduce": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "unicorn/prefer-regexp-test": "off",
    "no-secrets/no-secrets": "off",
    "no-console": "off",
    "import/prefer-default-export": "off",
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
    {
      files: ["scripts/**"],
      rules: {
        "unicorn/prefer-module": "off",
        "no-console": "off",
        "unicorn/import-style": "off",
        "unicorn/prefer-node-protocol": "off",
      },
    },
  ],
};
