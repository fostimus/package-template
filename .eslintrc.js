module.exports = {
  extends: ['nicenice'],
  rules: {
    'import/no-unresolved': 'error',
  },
  plugins: ['prettier'],
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       moduleDirectory: [
  //         'node_modules',
  //         'src/billing-providers',
  //         'src/helpers',
  //         'src/products',
  //         'src/usage',
  //         'src',
  //       ],
  //     },
  //   },
  // },
}
