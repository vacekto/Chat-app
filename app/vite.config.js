import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
    plugins: [react(), commonjs()],
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true
        },
    },
    build: {
        outDir: '../server/dist/SPA'
    }
});
