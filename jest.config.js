module.exports = {
  verbose: true,
  clearMocks: false,
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    // // 确保 import {} from 'umi' 正常 work
    // '@': '<rootDir>/src',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.((t|j)sx?)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
