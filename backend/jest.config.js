module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^errors/(.*)$": "<rootDir>/src/errors/$1",
    "^services/(.*)$": "<rootDir>/src/services/$1",
  },
};
