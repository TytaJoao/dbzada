# DBZada - Sistema de Gerenciamento de Jogos

Sistema de gerenciamento de jogos com API REST desenvolvido em Node.js, Express e PostgreSQL.

## 🚀 Tecnologias

- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize
- **Containerização**: Docker
- **Linting**: ESLint

## 📁 Estrutura do Projeto

```
dbzada/
├── src/                    # Código fonte da aplicação
│   ├── config/            # Configurações (banco de dados)
│   ├── controllers/       # Controladores da API
│   ├── models/           # Modelos do Sequelize
│   └── routes/           # Rotas da API
├── docker/               # Arquivos Docker
│   ├── docker-compose.yml
│   ├── docker-compose.dev.yml
│   ├── Dockerfile
│   ├── init.sql
│   └── .dockerignore
├── scripts/              # Scripts utilitários
│   └── setup-docker.sh
├── docs/                 # Documentação
│   ├── README.md
│   └── README-Docker.md
├── data/                 # Dados do projeto
│   ├── games-top-1000.csv
│   └── README.md
├── logs/                 # Logs da aplicação
└── package.json
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Git

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd dbzada
```

### 2. Configure as variáveis de ambiente

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dbzada
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DIALECT=postgres
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o banco de dados com Docker

```bash
./scripts/setup-docker.sh
```

### 5. Execute as migrações

```bash
npm run migrate
```

### 6. Inicie a aplicação

```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🐳 Docker

Para executar apenas com Docker:

```bash
cd docker
docker-compose up -d
```

Para desenvolvimento:

```bash
cd docker
docker-compose -f docker-compose.dev.yml up -d
```

Veja mais detalhes na [documentação Docker](docs/README-Docker.md).

## 📊 Modelos de Dados

### Tabelas Principais

- **jogos**: Informações dos jogos
- **desenvolvedoras**: Empresas desenvolvedoras
- **distribuidoras**: Empresas distribuidoras
- **generos**: Gêneros dos jogos
- **jogo_generos**: Relacionamento entre jogos e gêneros
- **avaliacoes**: Avaliações dos usuários

## 🔌 API Endpoints

### Jogos
- `GET /api/jogos` - Lista todos os jogos
- `GET /api/jogos/:id` - Busca jogo por ID
- `POST /api/jogos` - Cria novo jogo
- `PUT /api/jogos/:id` - Atualiza jogo
- `DELETE /api/jogos/:id` - Remove jogo

### Desenvolvedoras
- `GET /api/desenvolvedoras` - Lista desenvolvedoras
- `GET /api/desenvolvedoras/:id` - Busca desenvolvedora por ID
- `POST /api/desenvolvedoras` - Cria nova desenvolvedora
- `PUT /api/desenvolvedoras/:id` - Atualiza desenvolvedora
- `DELETE /api/desenvolvedoras/:id` - Remove desenvolvedora

### Distribuidoras
- `GET /api/distribuidoras` - Lista distribuidoras
- `GET /api/distribuidoras/:id` - Busca distribuidora por ID
- `POST /api/distribuidoras` - Cria nova distribuidora
- `PUT /api/distribuidoras/:id` - Atualiza distribuidora
- `DELETE /api/distribuidoras/:id` - Remove distribuidora

### Gêneros
- `GET /api/generos` - Lista gêneros
- `GET /api/generos/:id` - Busca gênero por ID
- `POST /api/generos` - Cria novo gênero
- `PUT /api/generos/:id` - Atualiza gênero
- `DELETE /api/generos/:id` - Remove gênero

### Avaliações
- `GET /api/avaliacoes` - Lista avaliações
- `GET /api/avaliacoes/:id` - Busca avaliação por ID
- `POST /api/avaliacoes` - Cria nova avaliação
- `PUT /api/avaliacoes/:id` - Atualiza avaliação
- `DELETE /api/avaliacoes/:id` - Remove avaliação

## 📝 Scripts Disponíveis

- `npm start` - Inicia a aplicação
- `npm run dev` - Inicia em modo desenvolvimento com nodemon
- `npm run migrate` - Executa migrações do banco
- `npm run seed` - Executa seeds do banco
- `npm run lint` - Executa linting do código

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no repositório.

## 📥 Importando dados do CSV para o banco

Um script simples está disponível para importar os dados do arquivo `data/games-top-1000.csv` diretamente para o banco de dados, incluindo relacionamentos completos.

### Como usar

1. Certifique-se de que o banco de dados está rodando (via Docker ou local).
2. Instale as dependências necessárias:
   ```bash
   npm install csv-parser
   ```
3. Execute o script:
   ```bash
   node scripts/seed-csv.js
   ```

### O que o script faz
- Cria desenvolvedoras e distribuidoras se não existirem, e associa ao jogo.
- Cria gêneros se não existirem, e associa ao jogo via tabela de relação.
- Não duplica registros já existentes.
- Importa os campos principais do jogo (título, data de lançamento, preço, classificação etária).

> **Observação:**
> - Os campos de país e ano de fundação para desenvolvedora/distribuidora são preenchidos como "Desconhecido" e 2000 por padrão.
> - Para customizar mais campos, edite o script conforme sua necessidade. 
