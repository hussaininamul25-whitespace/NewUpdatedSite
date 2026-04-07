import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        works: resolve(__dirname, 'works.html'),
        project1: resolve(__dirname, 'project1.html'),
        project2: resolve(__dirname, 'project2.html'),
        project3: resolve(__dirname, 'project3.html'),
        project4: resolve(__dirname, 'project4.html'),
        project5: resolve(__dirname, 'project5.html'),
        project6: resolve(__dirname, 'project6.html'),
        project7: resolve(__dirname, 'project7.html'),
        project8: resolve(__dirname, 'project8.html'),
        project9: resolve(__dirname, 'project9.html'),
        project10: resolve(__dirname, 'project10.html'),
        project11: resolve(__dirname, 'project11.html'),
        project12: resolve(__dirname, 'project12.html'),
        project13: resolve(__dirname, 'project13.html')
      }
    }
  }
});
