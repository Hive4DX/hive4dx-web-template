import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base path for GitHub Pages and static preview
  base: './',

  // Serve from project root
  root: '.',

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@css': '/css',
      '@config': '/config',
    },
  },

  // Dev server settings
  server: {
    port: 5173,
    open: true,
  },

  // Build settings
  build: {
    outDir: 'dist',
    rollupOptions: {
      // Declare all HTML entry points so Vite can bundle them all
      input: {
        main: 'index.html',
        livret_sanaa: 'livret-sanaa.html',
      },
    },
  },
});
