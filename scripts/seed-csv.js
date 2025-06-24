import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import Desenvolvedora from '../src/models/desenvolvedoraModel.js';
import Distribuidora from '../src/models/distribuidoraModel.js';
import Jogo from '../src/models/jogoModel.js';
import Genero from '../src/models/generoModel.js';
import JogoGenero from '../src/models/jogoGeneroModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getOrCreate(model, where, defaults = {}) {
  const [instance] = await model.findOrCreate({ where, defaults });
  return instance;
}

// Ajuste os campos conforme o seu model
async function importCSV() {
  const filePath = path.join(__dirname, '../data/games-top-1000.csv');
  const jogos = [];

  // Lê o CSV e armazena os dados em memória
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({
        separator: ',',
        quote: '"',
        escape: '"'
      }))
      .on('data', (row) => {
        jogos.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Lidos ${jogos.length} jogos do CSV.`);

  let jogosInseridos = 0;
  let erros = 0;

  for (const row of jogos) {
    try {
      console.log(`Processando jogo: ${row.AppID}`);
      
      // Desenvolvedora
      const devName = row.Developers ? row.Developers.split(',')[0].trim() : 'Desconhecida';
      let desenvolvedora = await Desenvolvedora.findOne({ where: { nome: devName } });
      if (!desenvolvedora) {
        desenvolvedora = await Desenvolvedora.create({
          nome: devName,
          pais: 'Desconhecido',
          anoFundacao: new Date('2000-01-01'),
        });
        console.log(`Criada desenvolvedora: ${devName}`);
      } else if (!desenvolvedora.anoFundacao) {
        desenvolvedora.anoFundacao = new Date('2000-01-01');
        await desenvolvedora.save();
      }

      // Distribuidora
      const distName = row.Publishers ? row.Publishers.split(',')[0].trim() : 'Desconhecida';
      let distribuidora = await Distribuidora.findOne({ where: { nome: distName } });
      if (!distribuidora) {
        distribuidora = await Distribuidora.create({
          nome: distName,
          pais: 'Desconhecido',
          anoFundacao: new Date('2000-01-01'),
        });
        console.log(`Criada distribuidora: ${distName}`);
      } else if (!distribuidora.anoFundacao) {
        distribuidora.anoFundacao = new Date('2000-01-01');
        await distribuidora.save();
      }

      // Jogo
      let dataLancamento = new Date(row.Name);
      if (isNaN(dataLancamento.getTime())) {
        dataLancamento = new Date('2000-01-01');
      }
      const jogo = await Jogo.create({
        titulo: row.AppID,
        dataLancamento,
        preco: parseFloat(row.Price) || 0,
        classificacao: row['Required age'] ? String(row['Required age']) : '0',
        idDesenvolvedora: desenvolvedora.id,
        idDistribuidora: distribuidora.id,
      });
      console.log('Jogo criado com ID:', jogo.id);
      jogosInseridos++;

      // Gêneros (pode ser uma lista separada por vírgula)
      if (row.Genres) {
        const generos = row.Genres.split(',').map(g => g.trim()).filter(Boolean);
        for (const nomeGenero of generos) {
          const genero = await getOrCreate(Genero, { nome: nomeGenero }, {
            descricao: '',
            created_at: new Date(),
            updated_at: new Date(),
          });
          // Relacionamento jogo-genero
          await JogoGenero.create({
            id_jogo: jogo.id,
            id_genero: genero.id,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }
    } catch (err) {
      console.error('Erro ao importar jogo:', row.AppID, err.message);
      erros++;
    }
  }

  console.log(`Importação concluída! Jogos inseridos: ${jogosInseridos}, Erros: ${erros}`);
  process.exit(0);
}

importCSV(); 