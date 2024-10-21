module.exports = {
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2020,
        sourceType: "module"
    },
    "extends": [
        "plugin:vue/essential",
    ],
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-tabs": "off",
        "vue/multi-word-component-names":"off",
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
};