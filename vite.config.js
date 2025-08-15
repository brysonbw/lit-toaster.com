/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { UUIDv4 } from './src/utils/helperFunctions.ts';

export default defineConfig({
  plugins: [
    eslint(),
    {
      name: 'csp',
      transformIndexHtml(html) {
        const NONCE = UUIDv4();
        const csp = `object-src 'none'; media-src 'none'; base-uri 'none'; script-src 'self' 'nonce-${NONCE}'; style-src 'nonce-${NONCE}'; style-src-attr 'nonce-${NONCE}'; img-src 'self' 'nonce-${NONCE}';`;
        html = html.replace(/<style>/g, `<style nonce="${NONCE}">`);
        html = html.replace(
          /<script\s+/g,
          `<script nonce="${NONCE}" type="module"`
        );
        html = html.replace(
          /<link\s+rel="stylesheet"/g,
          `<link rel="stylesheet" nonce="${NONCE}"`
        );
        html = html.replace(
          /<head>/,
          `<head>\n<meta http-equiv="Content-Security-Policy" content="${csp}">`
        );
        return html;
      },
    },
  ],
  build: {
    outDir: 'dist/browser',
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
      parse: {
        html5_comments: false,
      },
      sourceMap: false,
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
