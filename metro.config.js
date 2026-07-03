const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    resolverMainFields: ['react-native', 'browser', 'main'],
    sourceExts: [...new Set([...(defaultConfig.resolver.sourceExts || []), 'cjs', 'ts', 'tsx'])],
  },
  watchFolders: [path.resolve(__dirname, 'node_modules')],
};

module.exports = mergeConfig(defaultConfig, config);
