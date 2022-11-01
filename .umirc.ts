import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'StoreLite.js',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // extraBabelPlugins: process.env.NODE_ENV === 'production' ? ['babel-plugin-dynamic-import-node'] : [],
  chainWebpack(config) {
    // config.set('experiments', {
    //   ...config.get('experiments'),
    //   asyncWebAssembly: true
    // })

    const REG = /\.wasm$/;

    config.module.rule('asset').exclude.add(REG).end();

    config.module
      .rule('wasm')
      .test(REG)
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: 'assets/wasm/[hash:16].[ext]',
        limit: 1,
      })
      .end()
      .exclude.end()
      .type('javascript/auto')
      .end();
  },
  // more config: https://d.umijs.org/config
});
