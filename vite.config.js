import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        works: path.resolve(__dirname, 'works.html'),
        project1: path.resolve(__dirname, 'project1.html'),
        project2: path.resolve(__dirname, 'project2.html'),
        project3: path.resolve(__dirname, 'project3.html'),
        project4: path.resolve(__dirname, 'project4.html'),
        project5: path.resolve(__dirname, 'project5.html'),
        project6: path.resolve(__dirname, 'project6.html'),
        project7: path.resolve(__dirname, 'project7.html'),
        project8: path.resolve(__dirname, 'project8.html'),
        project9: path.resolve(__dirname, 'project9.html'),
        project10: path.resolve(__dirname, 'project10.html'),
        project11: path.resolve(__dirname, 'project11.html'),
        project12: path.resolve(__dirname, 'project12.html')
      }
    }
  }
};
