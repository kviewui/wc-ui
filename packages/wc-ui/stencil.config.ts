import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'wc-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        { src: '../node_modules/@wcui/icons/dist/wc-icons', dest: '@wcui/icons' }
      ]
    }
  ],
  testing: {
    browserHeadless: "new",
  },
  globalStyle: 'src/global/app.css'
};
