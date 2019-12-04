// jest.config.js
const { defaults } = require('jest-config');
module.exports = {
    automock: false,
    globals: {
        "__DEV__": true
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'ts', 'tsx'],
    preset: "react-native",
    rootDir: ".",
    setupFiles: [
        "./setupJest.js"
    ],
    verbose: true,
};