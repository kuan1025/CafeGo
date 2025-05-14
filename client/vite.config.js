import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };


  // https://vite.dev/config/#using-environment-variables-in-config
  // (Note that Vite doesn't load .env)
  return defineConfig({
    // eslint-disable-next-line no-undef
    base: process.env.VITE_BASENAME,
    plugins: [react(),
    {
      name: 'debug-env',
      configResolved(config) {
        console.log('VITE_BASENAME:', process.env.VITE_BASENAME);
        console.log('VITE_MODE:', process.env.NODE_ENV);
      }
    }
    ],
  })
}
