const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// To support nativewind/tailwindcss
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = config;

  return {
    ...config,
    resolver: {
      ...config.resolver,
      assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'lottie'],
      sourceExts: [...sourceExts, 'svg', 'cjs', 'mjs'],
    },
  };
})();
