import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
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