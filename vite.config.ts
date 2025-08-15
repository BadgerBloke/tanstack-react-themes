import { defineConfig, mergeConfig } from 'vitest/config'
import { tanstackViteConfig } from '@tanstack/config/vite'
import react from '@vitejs/plugin-react'
import packageJson from './package.json'
import type { ViteUserConfig } from 'vitest/config'

const config = defineConfig({
    plugins: [react()] as ViteUserConfig['plugins'],
    build: {
        rollupOptions: {
            external: [
                '@tanstack/react-router',
                '@tanstack/react-start',
                '@tanstack/react-start/server',
                'react',
                'react-dom'
            ]
        }
    },
    test: {
        name: packageJson.name,
        dir: './tests',
        watch: false,
        environment: 'jsdom',
        typecheck: { enabled: true },
        setupFiles: ['./tests/setupTests.tsx'],
    },
})

export default mergeConfig(
    config,
    tanstackViteConfig({
        entry: ['./src/index.ts'],
        srcDir: './src',
    }),
)
