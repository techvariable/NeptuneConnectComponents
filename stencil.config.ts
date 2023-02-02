import { Config } from '@stencil/core';

import { postcss } from '@stencil/postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export const config: Config = {
  namespace: 'neptune',
  sourceMap: true,
  globalStyle: 'src/global/global.css',
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
    },
  ],
  plugins: [
    postcss({
      plugins: [tailwindcss(), autoprefixer],
    }),
  ],
};
