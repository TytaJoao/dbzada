import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testCSV() {
  const filePath = path.join(__dirname, 'data/games-top-1000.csv');
  
  console.log('Testando leitura do CSV...');
  
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({
        separator: ',',
        quote: '"',
        escape: '"'
      }))
      .on('data', (row) => {
        console.log('=== PRIMEIRO REGISTRO ===');
        console.log('AppID:', row.AppID);
        console.log('Name:', row.Name);
        console.log('Release date:', row['Release date']);
        console.log('Price:', row.Price);
        console.log('Developers:', row.Developers);
        console.log('Publishers:', row.Publishers);
        console.log('Genres:', row.Genres);
        
        // Teste de parsing de data
        console.log('\n=== TESTE DE PARSING DE DATA ===');
        const dataFromName = new Date(row.Name);
        console.log('Data de row.Name:', row.Name);
        console.log('Data parseada:', dataFromName);
        console.log('É válida?', !isNaN(dataFromName.getTime()));
        
        const dataFromReleaseDate = new Date(row['Release date']);
        console.log('Data de row.Release date:', row['Release date']);
        console.log('Data parseada:', dataFromReleaseDate);
        console.log('É válida?', !isNaN(dataFromReleaseDate.getTime()));
        
        process.exit(0);
      })
      .on('end', resolve)
      .on('error', reject);
  });
}

testCSV(); 