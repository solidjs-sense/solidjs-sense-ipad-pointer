import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// @ts-ignore
const env = process.env.NODE_ENV;

export default defineConfig({
  plugins: [solidPlugin()],
  base: env === 'production' ? '/solidjs-sense-ipad-pointer' : '/',
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
