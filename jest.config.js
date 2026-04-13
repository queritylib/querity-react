/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": ["ts-jest", { tsconfig: { allowJs: true } }],
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  transformIgnorePatterns: ["node_modules/(?!uuid/)"],
  injectGlobals: false,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  resetMocks: true,
};
