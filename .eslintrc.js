module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react/jsx-runtime'],
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
  },
};
