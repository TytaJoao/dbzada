# Configuração do Banco de Dados com Docker

Este documento explica como configurar e executar o banco de dados PostgreSQL usando Docker para o projeto DBSteam.

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Node.js (para desenvolvimento local)

## 🚀 Opções de Configuração

### Opção 1: Apenas o Banco de Dados (Recomendado para Desenvolvimento)

Use este comando para iniciar apenas o PostgreSQL e pgAdmin:

```bash
docker-compose up -d
```

**Acessos:**
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:8080`
  - Email: `admin@dbsteam.com`
  - Senha: `admin123`

### Opção 2: Aplicação Completa (Banco + API)

Use este comando para iniciar tudo junto:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

**Acessos:**
- **API**: `http://localhost:3000`
- **PostgreSQL**: `localhost:5432`
- **pgAdmin**: `http://localhost:8080`

## 🔧 Configuração das Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Configurações do Banco de Dados PostgreSQL
POSTGRES_DB=dbsteam
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Configurações da API
API_PORT=3000

# Configurações do Ambiente
NODE_ENV=development
```

## 📊 Estrutura do Banco de Dados

O projeto utiliza as seguintes tabelas:

1. **desenvolvedoras** - Informações sobre desenvolvedoras de jogos
2. **distribuidoras** - Informações sobre distribuidoras
3. **generos** - Gêneros de jogos
4. **jogos** - Tabela principal com informações dos jogos
5. **avaliacoes** - Avaliações dos jogos

## 🛠️ Comandos Úteis

### Iniciar os serviços
```bash
docker-compose up -d
```

### Parar os serviços
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f postgres
```

### Acessar o banco via terminal
```bash
docker exec -it dbsteam_postgres psql -U postgres -d dbsteam
```

### Fazer backup do banco
```bash
docker exec dbsteam_postgres pg_dump -U postgres dbsteam > backup.sql
```

### Restaurar backup
```bash
docker exec -i dbsteam_postgres psql -U postgres dbsteam < backup.sql
```

## 🔍 Conectando no pgAdmin

1. Acesse `http://localhost:8080`
2. Faça login com:
   - Email: `admin@dbsteam.com`
   - Senha: `admin123`
3. Adicione um novo servidor:
   - **Name**: DBSteam
   - **Host**: `postgres` (ou `localhost` se acessando de fora do Docker)
   - **Port**: `5432`
   - **Database**: `dbsteam`
   - **Username**: `postgres`
   - **Password**: `postgres123`

## 🚨 Solução de Problemas

### Porta 5432 já em uso
```bash
# Parar serviço PostgreSQL local
sudo service postgresql stop

# Ou usar porta diferente no docker-compose.yml
ports:
  - "5433:5432"
```

### Erro de conexão
- Verifique se o container está rodando: `docker ps`
- Verifique os logs: `docker-compose logs postgres`
- Confirme as variáveis de ambiente no arquivo `.env`

### Resetar banco de dados
```bash
# Parar e remover volumes
docker-compose down -v

# Iniciar novamente
docker-compose up -d
```

## 📝 Notas Importantes

- Os dados do PostgreSQL são persistidos no volume `postgres_data`
- O script `init.sql` é executado automaticamente na primeira inicialização
- Para desenvolvimento, recomenda-se usar apenas o banco via Docker e rodar a aplicação localmente
- O pgAdmin facilita a visualização e gerenciamento do banco de dados