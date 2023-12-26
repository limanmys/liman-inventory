/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  rules: {
    semi: ["error", "never"],
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
}
