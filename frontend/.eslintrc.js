module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  rules: {
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: true
      }
    ]
  },
  parserOptions: {
    ecmaVersion: 2019
  }
}
