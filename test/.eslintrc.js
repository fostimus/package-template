'use strict'

const dotenv = require('dotenv')
dotenv.config({ path: '.env', override: true })

// Set this ENV variable if you're doing development work and you want to save progress
// but things are maybe in a state that the linter does not like
const DISABLE_ANNOYING = ['1', 1, 'true', true].includes(
  process.env.PRECOMMIT_DISABLE_ANNOYING
)
const ANNOYING_RULES_CONFIG = DISABLE_ANNOYING
  ? [
      'no-unused-vars',
      'mocha/no-exclusive-tests',
      'no-only-tests/no-only-tests',
    ].reduce((acc, ruleName) => {
      acc[ruleName] = 'off'
      return acc
    }, {})
  : null

const config = {
  extends: '../.eslintrc.js',
  env: {
    mocha: true,
  },
  plugins: ['mocha'],
  rules: {
    // 'mocha/no-skipped-tests': 'error',
    'mocha/no-exclusive-tests': 'error',
  },
  globals: {
    expect: 'readonly',
    should: 'readonly',
    sinon: 'readonly',
    mount: 'readonly',
    render: 'readonly',
    shallow: 'readonly',
    //* ************************************************
    // bdd-lazy-var
    //
    // In order to get around eslint complaining for now:
    // https://github.com/stalniy/bdd-lazy-var/issues/56#issuecomment-639248242
    $: 'readonly',
    its: 'readonly',
    def: 'readonly',
    subject: 'readonly',
    get: 'readonly',
    sharedExamplesFor: 'readonly',
    includeExamplesFor: 'readonly',
    itBehavesLike: 'readonly',
    is: 'readonly',
    //
    //* ************************************************
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        // TODO: only add the 'src' directory, and make everything use the path from there
        moduleDirectory: [
          'node_modules',
          'src/frontend',
          'src/server',
          'src/shared',
          'src',
        ],
      },
      alias: {
        map: [
          // imports from 'test/...' will now work
          ['test', './test'],
          // imports from 'data/...' will now work
          ['data', './data'],
        ],
      },
    },
  },
}

if (ANNOYING_RULES_CONFIG) {
  config.rules = {
    ...config.rules,
    ...ANNOYING_RULES_CONFIG,
  }
}

module.exports = config
