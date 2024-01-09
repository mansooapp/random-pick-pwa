import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve/*, extname*/ } from 'path';
// import alias from "@rollup/plugin-alias";

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       nested: resolve(__dirname, 'index.html')
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    svelte(),
    VitePWA({
      base: 'http://static.devnology.co.kr/apps/randompick/',
      useCredentials: true,
      includeAssets: ['favicon.ico', 'favicon.svg','robots.txt','apple-touch-icon.png'],
      manifest: {
        name: 'RandomPick',
        short_name: 'Random Pick',
        description: 'Random Pick',
        theme_color: '#ffffff',
        start_url:"http://static.devnology.co.kr/apps/randompick/index.html",
        icons: [
          {
            src: 'whatToEatToday-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'whatToEatToday-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'whatToEatToday-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    })/*,
    alias({
      entries: [
        {
          find: "@",
          replacement: resolve(__dirname, "src/")
        }
      ]
    })*/
  ],
  experimental: {
    renderBuiltUrl(filename: string, { hostId, hostType, type }: { hostId: string, hostType: 'js' | 'css' | 'html', type: 'public' | 'asset' }) {
      console.log('### filename: ', filename);
      return 'http://static.devnology.co.kr/apps/randompick/' + filename;
      /*
      if (type === 'public') {
        return 'http://static.devnology.co.kr/files/apps/whatToEatToday/' + filename
      } else if (extname(hostId) === '.js') {
        return { runtime: `window.__assetsPath(${JSON.stringify(filename)})` }
      } else {
        return 'http://static.devnology.co.kr/files/apps/whatToEatToday/' + filename
      }
      */
    }
  }
})
