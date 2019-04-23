// https://eslint.org/docs/user-guide/configuring
/**
 * eslint 相关使用依赖：
 * 1、eslint
 * 2、eslint-config-standard       - 第三方，依赖于eslint-plugin-node和eslint-plugin-import
 * 3、eslint-plugin-standard
 * 4、babel-eslint
 * 5、eslint-friendly-formatter
 * 6、eslint-loader                - 要使webpack支持eslint，就要要安装 eslint-loader
 * 7、eslint-plugin-import
 * 8、eslint-plugin-promise
 * 9、eslint-plugin-vue             - vue 项目
 * 10、eslint-plugin-node           - node
 * 11、eslint-plugin-html           - html 项目 可选 ******
 */

module.exports = {
  root: true,
  //想要支持的JS语言选项
  parserOptions: {
    /**
     * babel-eslint 解析器是一种使用频率很高的解析器，
     * 因为现在很多公司的很多项目目前都使用了es6，为了兼容性考虑基本都使用babel插件对代码进行编译。
     * 而用babel编译后的代码使用 babel-eslint 这款解析器可以避免不必要的麻烦。
     * npm install --save-dev babel-eslint
     */
    parser: 'babel-eslint',
    //默认为script
    sourceType: 'module',
  },
  //代码运行的环境，每个环境都会有一套预定义的全局对象，不同环境可以组合使用
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  /**
   * 1、使用第三方分享的，我们一般需要安装相关的插件代码如下:
   * npm install --save-dev eslint-config-airbnb // bnb
   * npm install --save-dev eslint-config-standard // standard
   *
   * 2、使用这些第三方的扩展，有时我们需要更新一些插件，比如standard：
   * npm install --save-dev eslint-plugin-import
   */
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  /**
   * 这个插件将会提醒模块脚本之间模拟浏览器共享全局变量的行为，因为这不适用于模块脚本。
   * 这个插件也可以扩展文件，如：.vue，.jsx
   *  npm install --save-dev eslint-plugin-html eslint-plugin-vue
   */
  settings: {
    'html/html-extensions': ['.html', '.vue'],
    'html/indent': '+2',
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
