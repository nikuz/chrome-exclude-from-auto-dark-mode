import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'content-scripts/content-script.ts'),
            name: 'content-script',
            fileName: 'content-script',
            formats: ['es'],
        },
        emptyOutDir: false,
    },
    resolve: {
        alias: {
            utils: path.resolve(__dirname, 'utils'),
        }
    }
});