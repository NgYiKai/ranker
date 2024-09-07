import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    port: 8080,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
