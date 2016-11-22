module.exports = {
  'globals' : {
    '_': false
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'parser': 'babel-eslint',
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
      'classes': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'complexity': 1,
    'eqeqeq': ['warn', 'smart'],
    'no-eq-null': 1,
    'no-console': ["warn", { allow: ["warn", "error"] }],
    'no-alert': 1,
    'no-eval': 1,
    'no-extra-bind': 1,
    'no-unused-vars': 1,
    'no-floating-decimal': 1,
    'no-undef-init': 1,
    'global-require' : 1,

    // Stylistic issues
    'indent': ['warn', 2, {'SwitchCase': 1}],
    'quotes': ['warn', 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
    'semi': ['error',	 'never'],
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'no-multi-spaces': 1,
    'eol-last' : 1,
    'array-bracket-spacing': 1,
    'block-spacing': 1,
    'brace-style': ['warn', '1tbs', { 'allowSingleLine': true }],
    'camelcase': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'comma-style': 1,
    'computed-property-spacing': 1,
    'jsx-quotes': 1,
    'key-spacing': 1,
    'keyword-spacing': 1,
    'linebreak-style': 1,
    'no-multiple-empty-lines': 1,
    'no-trailing-spaces': 1,
    'no-underscore-dangle': ['warn', {'allow': ['_id']}],
    'no-whitespace-before-property': 1,
    'object-curly-spacing': ['warn', 'never', { 'arraysInObjects': true, 'objectsInObjects': true }],
    'operator-assignment': 1,
    'space-in-parens': 1,
    'space-before-function-paren': ['warn', 'never'],
    'arrow-parens': 1,
    'arrow-spacing': 1,
    'no-duplicate-imports': 1,
    'no-useless-computed-key': 1,
    'object-shorthand': 1,
    'no-var': 1,
    'prefer-const': 1
  }
}
