module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  plugins: [
    'prettier'
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
    DOMParser: 'readonly',
    document: 'writable',
    UIkit3: 'writable'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-plusplus': 0,
    'max-len': [
      'error',
      {
        'ignoreComments': true,
        'ignoreTemplateLiterals': true,
        'code': 120
      }
    ],
    'quotes': [
      'error',
      'single',
      { 'allowTemplateLiterals': true }
    ],
    'no-continue': 0,
    'no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/interface-name-prefix': 0,
    'no-sequences': 0,
    'no-unused-expressions': 0,
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 0,
    'no-param-reassign': 0,
    'linebreak-style': 0,
    'indent': 'off',
    'indent-legacy': ['error', 2],
    'semi': [2, 'never'],
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    'no-return-await': 'off',
    'prefer-destructuring': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-shadow': 0,
    'array-bracket-spacing': 'off',
    'camelcase': 'off',
    'default-case': 0,
    'prefer-template': 2,
    'no-useless-concat': 2,
    'object-property-newline': 2,
    'operator-linebreak': [2, 'before'],
    'func-call-spacing': 2,
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true,
      'mode': 'strict'
    }],
    'space-unary-ops': 2,
    'space-infix-ops': 2,
    'template-curly-spacing': [2, 'never'],
    'no-case-declarations': 0,

    // VUE
    'vue/no-v-html': 0,
    'vue/html-indent': ['error', 2],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-reserved-keys': ['error', {
      'reserved': [
        '$rs',
        'x',
        'y',
        'l',
        'j',
        'foo',
        'bar',
        'test'
      ]
    }],
    'vue/max-attributes-per-line': ['error', {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    'vue/space-infix-ops': 2,
    'vue/space-unary-ops': 2,
    'vue/keyword-spacing': 2,
    'vue/key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true,
      'mode': 'strict'
    }],
    'vue/eqeqeq': 2,
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],
    'vue/no-multi-spaces': 2,
    'vue/no-spaces-around-equal-signs-in-attribute': 2,
    'vue/require-prop-types': 2,
    'vue/singleline-html-element-content-newline': 2,
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/v-slot-style': ['error', 'shorthand'],
    'vue/component-tags-order': ["error", {
      "order": ["template", "script", "style"]
    }],
    'vue/this-in-template': 2,
    'vue/match-component-file-name': ["error", {
      "extensions": ["vue"],
      "shouldMatchCase": false
    }]
  }
};
