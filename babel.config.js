module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/transform-react-jsx-source',
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@animations': './src/animations',
          '@boot': './src/boot',
          '@images': './src/assets/images',
          '@components': './src/components',
          '@constants': './src/constants',
          '@containers': './src/containers',
          '@hocs': './src/hocs',
          '@hooks': './src/hooks',
          '@modules': './src/modules',
          '@screens': './src/screens',
          '@services': './src/services',
          '@static': './src/static',
          '@types': './src/types',
          '@utils': './src/utils',
          '@secrets': './secrets',
        },
      },
    ],
  ],
};
