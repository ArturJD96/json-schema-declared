import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.d.ts',
      formats: ['es'],
      fileName: 'json-schema-metaschemas',
    },
  },
})
