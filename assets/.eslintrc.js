module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "globals": {
    "document": true,
    "describe": true,
    "it": true,
    "jest": true,
    "mount": true,
    "shallow": true,
    "expect": true
  },
  "rules": {
    "strict": 0,
    "no-shadow": 0,
    "comma-dangle": [2, "never"],
    "consistent-return": 0,
    "import/no-unresolved": 0,
    "jsx-a11y/label-has-for": 0,
    "newline-per-chained-call": 0,
    "object-curly-newline": 0,
    "quotes": [2, "double" ],
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/react-in-jsx-scope": 0,
    "import/no-named-as-default": 0,
    "react/require-default-props": 0,
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": [
          "./js/tests/**",
          "**/*.test.js",
          "webpack.config.js"
        ]
      }
    ]
  }
};
