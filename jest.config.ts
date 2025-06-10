import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.svg$': '<rootDir>/svg.js',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}

export default config