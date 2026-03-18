/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
