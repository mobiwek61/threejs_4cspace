import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// custom from Copilot for hot reload needed for react on codespace vite project
export default {
  server: {
    watch: {
      usePolling: true
    },
    host: true
  }
  // plugins: [react()],
}