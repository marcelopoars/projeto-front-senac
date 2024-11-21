import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }] // Configuração ajustada aqui
  },
  transformIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/src/**/*.(spec|test).(ts|tsx|js)"]
};

export default config;
