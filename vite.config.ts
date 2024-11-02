import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        rollupOptions: {
            input: {
                app: './popup/index.html',
            },
        },
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'utils'),
        }
    }
});