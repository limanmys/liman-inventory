/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "plugin:@intlify/vue-i18n/recommended",
  ],
  rules: {
    semi: ["error", "never"],
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  settings: {
    "vue-i18n": {
      localeDir: "./src/localization/en.json", // extension is glob formatting!
      messageSyntaxVersion: "^9.0.0",
    },
  },
}
