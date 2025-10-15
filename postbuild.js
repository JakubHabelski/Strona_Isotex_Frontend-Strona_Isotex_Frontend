import { replaceInFile } from 'replace-in-file';
import fs from 'fs';
import path from 'path';

const buildPath = path.join(process.cwd(), 'build/index.html');
const cssFiles = fs
  .readdirSync(path.join(process.cwd(), 'build/static/css'))
  .filter((file) => file.startsWith('main.') && file.endsWith('.css'));

if (cssFiles.length > 0) {
  const cssFile = cssFiles[0];
  replaceInFile({
      files: buildPath,
      from: /<link href="\/static\/css\/main\.[a-z0-9]+\.css" rel="stylesheet">/,
      to: `<link rel="preload" href="/static/css/${cssFile}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/static/css/${cssFile}"></noscript>`,
      allowEmptyPaths: true
    })
    .then((results) => {
      if (results.some(r => r.hasChanged)) {
        console.log(`Zastąpiono CSS na preload dla ${cssFile}`);
      } else {
        console.warn('Nie znaleziono dopasowania do zamiany w index.html');
      }
    })
    .catch((error) => {
      console.error('Błąd podczas zamiany CSS:', error);
    });
}