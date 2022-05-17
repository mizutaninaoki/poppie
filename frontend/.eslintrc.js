module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  settings: {
    jest: {
      version: 26,
    },
    // ----------------------------------------------
    // eslint-plugin-importの設定
    // ----------------------------------------------
    "import/resolver": {
      typescript: {
        project: __dirname,
      },
    },
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: "./tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    // 利用してないimportをエラーにするプラグイン
    // https://github.com/sweepline/eslint-plugin-unused-imports
    "unused-imports",
  ],
  rules: {
    "no-console": 0,
    "no-shadow": 0,
    "no-void": [2, { allowAsStatement: true }],
    "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
    "@typescript-eslint/no-shadow": 2,
    // ----------------------------------------------
    // eslint-plugin-reactのルール
    // ----------------------------------------------
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react-hooks/exhaustive-deps": 0,
    "react/require-default-props": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "@typescript-eslint/no-floating-promises": "off",
    "unused-imports/no-unused-imports": "error",
    // ----------------------------------------------
    // eslint-plugin-importのルール
    // ----------------------------------------------
    // 解決できないimportはエラーにする
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    // importの対象に拡張子をつけるか否か
    "import/extensions": [
      "error",
      // 拡張子は必須
      "always",
      {
        // ただし、以下の拡張子の場合、拡張子不要
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
  root: true,
};
