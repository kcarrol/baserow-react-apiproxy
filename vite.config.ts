import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      '/api/baserow': {
        target: 'https://api.baserow.io/api/database/rows/table/121195/?user_field_names=true',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/baserow/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', function(proxyReq, req, res, options) {
            proxyReq.setHeader('lcu-subscription-key', `Token ${process.env.VITE_BASEROW_LCU_SUBSCRIPTION_ID}`);
          });
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    },
  },
})
}