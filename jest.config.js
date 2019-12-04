// jest.config.js
const { defaults } = require('jest-config');
module.exports = {
    // ...
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'ts', 'tsx'],
    preset: "react-native",
    verbose: true,
    // ...
};