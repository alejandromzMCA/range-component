/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        browser: {
            provider: 'playwright',
            enabled: true,
            name: 'chromium'
        },
    },
})
