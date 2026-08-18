import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.d.ts',
      formats: ['es'],
      fileName: 'json-schema-metaschemas',
    },
  },
})
