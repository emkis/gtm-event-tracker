module.exports = {
  '*.{ts,js}': ['eslint --fix'],
  '**/!(.api-report)/*.{json,md}': ['prettier --write'],
}
