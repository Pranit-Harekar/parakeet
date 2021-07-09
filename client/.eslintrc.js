const schemaJson = require('./shared/graphql-schema.json')

const { specifiedRules: allGraphqlRules } = require('graphql')

// can't turn 'all' on because of $locationId
// https://github.com/apollographql/eslint-plugin-graphql/issues/19
const validators = allGraphqlRules
  .map((rule) => rule.name)
  .filter(
    (ruleName) =>
      [
        'NoUnusedFragments',
        'KnownFragmentNames',
        'NoUnusedVariables',
      ].findIndex((x) => x === ruleName) === -1,
  )

module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': 'error',
    // GraphQl Rules
    'graphql/template-strings': [
      'error',
      {
        validators,
        env: 'apollo',
        schemaJson,
      },
    ],
    'graphql/named-operations': [
      'error',
      {
        schemaJson,
      },
    ],
    'graphql/required-fields': [
      'error',
      {
        env: 'apollo',
        schemaJson,
        requiredFields: ['uuid'],
      },
    ],
    'graphql/capitalized-type-name': [
      'error',
      {
        schemaJson,
      },
    ],
    'graphql/no-deprecated-fields': [
      'error',
      {
        env: 'apollo',
        schemaJson,
      },
    ],

    // React Native Plugin rules
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 1,
    'react-native/no-raw-text': [
      'error',
      {
        skip: [
          'TextLink',
          'TextDimension',
          'ImageDimension',
          'ErrorMessage',
          'Item',
          'Button',
          'Modal',
          'ErrorModal',
        ],
      },
    ],
    'react-native/no-single-element-style-arrays': 2,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'graphql'],
  extends: ['../../.eslintrc'],
}
