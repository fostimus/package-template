'use strict'

module.exports = {
  diff: true,
  delay: false,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  // Need more JSON diff to be displayed? This is your guy.
  // 'reporter-option': ['maxDiffSize=160000'],
  slow: 75,
  timeout: 2000,
  spec: ['./test/**/*.test.js'],
  require: [
    // https://mochajs.org/#-require-module-r-module
    '@swc/register',
    './test/environment.js',
  ],
  file: './test/setup.js',
  ui: 'bdd-lazy-var/getter',
  'watch-files': ['./test/**/*.test.js', './src/**/*.js'],
  'watch-ignore': [],
  exit: true,
}
