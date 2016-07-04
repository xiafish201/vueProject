/* eslint-disable */
module.exports = {
    root: true,
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // 注册全局变量，
    globals: {
        'mui': false,
        'plus': false
    },
    // add your custom rules here
    rules: {
        "no-multiple-empty-lines": ["error", {
            "max": 2,
            "maxBOF": 1
        }],
        // 必须分号结尾，但是括号单行最后可以省略
        'semi': ['error', 'always', {
            'omitLastInOneLineBlock': true
        }],
        // 命名的函数和匿名函数的圆括号之前都必须没有空格
        'space-before-function-paren': ['error', 'never'],
        // tab 为4个space，级别是error
        'indent': ['error', 4],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
