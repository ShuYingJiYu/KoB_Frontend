module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    // 'plugin:vue/essential',
    'plugin:vue/vue3-recommended',
    // 'airbnb-base',
    'prettier',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // eslint-plugin-vue 的规则：https://eslint.vuejs.org/rules/attributes-order.html
    'vue/no-v-for-template-key': 'off',

    // eslint 的规则 :
    'no-use-before-define': 'off',
    // eslint-plugin-import 的规则
    'import/no-unresolved': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-lone-template': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/order-in-components': 'off',
    'vue/no-unused-components': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/attributes-order': 'off'
  }
}
