# Estrutura de Dados - DBSteam

Este diretório contém os arquivos de dados CSV e scripts para processamento.

## 📁 Estrutura

```
data/
├── raw/                    # Dados brutos (CSV original)
│   └── games_data.csv     # CSV original com dados dos jogos
├── processed/              # Dados processados
│   ├── desenvolvedoras.csv
│   ├── distribuidoras.csv
│   ├── generos.csv
│   └── jogos.csv
└── README.md              # Este arquivo
```

## 📊 Formato dos Dados

### CSV Original (games_data.csv)
O arquivo CSV deve conter as seguintes colunas:
- `titulo` - Nome do jogo
- `data_lancamento` - Data de lançamento (YYYY-MM-DD)
- `preco` - Preço do jogo
- `classificacao_etaria` - Classificação etária
- `desenvolvedora` - Nome da desenvolvedora
- `distribuidora` - Nome da distribuidora
- `genero` - Gênero do jogo
- `avaliacao` - Avaliação (positivo/negativo)
- `comentario` - Comentário da avaliação

## 🔄 Processamento

### 1. Colocar o CSV Original
```bash
# Coloque seu arquivo CSV aqui
cp seu_arquivo.csv data/raw/games_data.csv
```

### 2. Executar o Script de Processamento
```bash
# Processar os dados
node scripts/data-processing/process-csv.js
```

### 3. Importar para o Banco
```bash
# Importar dados processados
node scripts/data-processing/import-to-db.js
```

## 📋 Scripts Disponíveis

- `scripts/data-processing/process-csv.js` - Processa o CSV original
- `scripts/data-processing/import-to-db.js` - Importa dados para o banco
- `scripts/data-processing/validate-data.js` - Valida os dados

## ⚠️ Notas Importantes

- Sempre mantenha o arquivo original em `raw/`
- Os dados processados ficam em `processed/`
- Execute a validação antes de importar
- Faça backup antes de importar grandes volumes de dados

# Dados do Projeto DBZada

Esta pasta contém os dados utilizados pelo sistema DBZada.

## 📁 Arquivos

### games-top-1000.csv

Arquivo CSV contendo os 1000 jogos com mais donos estimados, filtrados do dataset original do Steam.

**Estrutura do arquivo:**
- `AppID` - ID único do jogo no Steam
- `Name` - Nome do jogo
- `Release date` - Data de lançamento
- `Estimated owners` - Faixa estimada de donos (ex: "0 - 20000")
- `Peak CCU` - Pico de jogadores simultâneos
- `Required age` - Idade mínima requerida
- `Price` - Preço do jogo
- `Developers` - Desenvolvedoras
- `Publishers` - Distribuidoras
- `Genres` - Gêneros do jogo
- `Tags` - Tags do jogo
- E outros campos relacionados

**Estatísticas:**
- Total de registros: 1.000
- Maior número de donos: 1.311.366
- Menor número de donos: 1.114
- Período: Jogos de 2008 a 2025

## 🔄 Processamento dos Dados

### Filtros Aplicados

1. **Remoção de registros sem donos**: Jogos com 0 donos estimados foram removidos
2. **Ordenação por popularidade**: Ordenados por número de donos em ordem decrescente
3. **Limitação**: Mantidos apenas os top 1000 jogos

### Metodologia

O arquivo foi processado usando um script Python que:
- Extrai o número máximo de donos de strings como "0 - 20000"
- Remove registros inválidos ou vazios
- Ordena por popularidade
- Limita aos 1000 mais populares

## 📊 Uso no Sistema

### Importação

Para importar estes dados no sistema:

1. Certifique-se de que o banco de dados está configurado
2. Execute as migrações: `npm run migrate`
3. Use a API para criar os registros ou implemente um script de seed

### Mapeamento de Campos

| CSV Field | Database Field | Model |
|-----------|----------------|-------|
| Name | titulo | jogos |
| Release date | data_lancamento | jogos |
| Price | preco | jogos |
| Required age | classificacao_etaria | jogos |
| Developers | nome | desenvolvedoras |
| Publishers | nome | distribuidoras |
| Genres | nome | generos |

## 🔍 Análise dos Dados

### Top 10 Jogos por Popularidade

1. **1.311.366 donos** - Jogo com maior base de usuários
2. **1.284.268 donos** - Segundo colocado
3. **1.214.621 donos** - Terceiro colocado
4. **872.138 donos** - Quarto colocado
5. **825.215 donos** - Quinto colocado

### Distribuição por Gêneros

Os gêneros mais populares incluem:
- Action
- Adventure
- RPG
- Strategy
- Simulation
- Sports
- Casual

### Período de Lançamento

- **Mais antigo**: 2008
- **Mais recente**: 2025
- **Concentração**: Maioria dos jogos populares são de 2010-2020

## 🛠️ Manutenção

### Atualização dos Dados

Para atualizar os dados:

1. Obtenha um novo dataset do Steam
2. Execute o script de filtragem
3. Substitua o arquivo atual
4. Atualize esta documentação

### Backup

- Mantenha backup do arquivo original
- Versionamento no Git
- Documente mudanças significativas

## 📈 Próximos Passos

- [ ] Implementar script de importação automática
- [ ] Adicionar mais campos relevantes
- [ ] Criar visualizações dos dados
- [ ] Implementar sistema de cache
- [ ] Adicionar dados de reviews e ratings

## 🔗 Referências

- [Steam Database](https://steamdb.info/) - Fonte dos dados
- [Steam API](https://developer.valvesoftware.com/wiki/Steam_Web_API) - API oficial
- [Kaggle Steam Games](https://www.kaggle.com/datasets/tamber/steam-video-games) - Dataset similar

---

**Última atualização**: Junho 2025
**Versão dos dados**: 1.0
**Responsável**: Equipe DBZada 