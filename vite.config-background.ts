import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'background/background.ts'),
            name: 'background',
            fileName: 'background',
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