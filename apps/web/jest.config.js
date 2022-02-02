// eslint-disable-next-line no-undef
module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/__tests__/**/*.spec.ts?(x)'],
  moduleNameMapper: {
    '^utils/(.*)$': '<rootDir>/utils/$1',
  },
}
