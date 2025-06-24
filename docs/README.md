# Documentação DBZada

Bem-vindo à documentação do projeto DBZada - Sistema de Gerenciamento de Jogos.

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Configuração](#configuração)
4. [API Reference](#api-reference)
5. [Modelos de Dados](#modelos-de-dados)
6. [Deploy](#deploy)
7. [Troubleshooting](#troubleshooting)

## 🎯 Visão Geral

O DBZada é um sistema completo para gerenciamento de jogos, desenvolvido com foco em:

- **Simplicidade**: API REST clara e intuitiva
- **Escalabilidade**: Arquitetura modular e bem estruturada
- **Manutenibilidade**: Código limpo e bem documentado
- **Performance**: Otimizado para consultas eficientes

### Funcionalidades Principais

- ✅ CRUD completo para jogos, desenvolvedoras, distribuidoras e gêneros
- ✅ Sistema de avaliações com notas positivas/negativas
- ✅ Relacionamentos entre entidades
- ✅ API REST documentada
- ✅ Containerização com Docker
- ✅ Banco de dados PostgreSQL

## 🏗️ Arquitetura

### Stack Tecnológica

```
Frontend (Futuro) ←→ API REST ←→ Sequelize ORM ←→ PostgreSQL
```

### Estrutura de Pastas

```
src/
├── config/          # Configurações (banco, ambiente)
├── controllers/     # Lógica de negócio
├── models/         # Modelos Sequelize
├── routes/         # Definição de rotas
└── server.js       # Servidor Express
```

### Padrões Utilizados

- **MVC**: Separação clara entre Model, View (API) e Controller
- **Repository Pattern**: Abstração da camada de dados
- **REST**: API seguindo princípios REST
- **Dependency Injection**: Injeção de dependências via Sequelize

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dbzada
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_DIALECT=postgres

# Servidor
PORT=3000
NODE_ENV=development

# Logs
LOG_LEVEL=info
```

### Configuração do Banco

O projeto utiliza PostgreSQL com Sequelize como ORM. As configurações estão em `src/config/postgres.js`.

## 🔌 API Reference

### Autenticação

Atualmente a API não requer autenticação, mas está preparada para implementação futura.

### Headers

```http
Content-Type: application/json
Accept: application/json
```

### Respostas

Todas as respostas seguem o padrão:

```json
{
  "success": true,
  "data": {...},
  "message": "Operação realizada com sucesso"
}
```

### Códigos de Status

- `200` - Sucesso
- `201` - Criado
- `400` - Bad Request
- `404` - Não encontrado
- `500` - Erro interno

## 📊 Modelos de Dados

### Diagrama ER

```
jogos (1) ←→ (N) jogo_generos (N) ←→ (1) generos
   ↓
   (N) ←→ (1) desenvolvedoras
   ↓
   (N) ←→ (1) distribuidoras
   ↓
   (1) ←→ (N) avaliacoes
```

### Esquemas das Tabelas

#### jogos
- `id_jogo` (PK, SERIAL)
- `titulo` (VARCHAR(255), NOT NULL)
- `data_lancamento` (DATE, NOT NULL)
- `preco` (DECIMAL(10,2), NOT NULL)
- `classificacao_etaria` (VARCHAR(20), NOT NULL)
- `id_desenvolvedora` (FK → desenvolvedoras.id)
- `id_distribuidora` (FK → distribuidoras.id)
- `created_at`, `updated_at` (TIMESTAMP)

#### desenvolvedoras
- `id` (PK, SERIAL)
- `nome` (VARCHAR(255), NOT NULL)
- `pais` (VARCHAR(14), NOT NULL)
- `ano_fundacao` (DATE, NOT NULL)
- `created_at`, `updated_at` (TIMESTAMP)

#### distribuidoras
- `id` (PK, SERIAL)
- `nome` (VARCHAR(255), NOT NULL)
- `pais` (VARCHAR(14), NOT NULL)
- `ano_fundacao` (DATE, NOT NULL)
- `created_at`, `updated_at` (TIMESTAMP)

#### generos
- `id` (PK, SERIAL)
- `nome` (VARCHAR(100), NOT NULL)
- `descricao` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)

#### jogo_generos
- `id` (PK, SERIAL)
- `id_jogo` (FK → jogos.id_jogo)
- `id_genero` (FK → generos.id)
- `created_at`, `updated_at` (TIMESTAMP)
- UNIQUE(id_jogo, id_genero)

#### avaliacoes
- `id` (PK, SERIAL)
- `nota` (ENUM('positivo', 'negativo'), NOT NULL)
- `comentario` (VARCHAR(255))
- `data_avaliacao` (TIMESTAMP, NOT NULL)
- `id_jogo` (FK → jogos.id_jogo)
- `created_at`, `updated_at` (TIMESTAMP)

## 🚀 Deploy

### Produção

1. Configure as variáveis de ambiente
2. Execute as migrações
3. Inicie o servidor

```bash
npm run migrate
npm start
```

### Docker

```bash
cd docker
docker-compose up -d
```

### Monitoramento

- Logs: `logs/` directory
- Health check: `GET /health`
- Métricas: Futura implementação

## 🔧 Troubleshooting

### Problemas Comuns

#### Erro de Conexão com Banco

```bash
# Verificar se o PostgreSQL está rodando
docker ps | grep postgres

# Verificar logs
docker logs dbzada-postgres-1
```

#### Erro de Migração

```bash
# Resetar banco
npm run migrate:undo:all
npm run migrate
```

#### Porta em Uso

```bash
# Verificar processos na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>
```

### Logs

Os logs são salvos em `logs/` com diferentes níveis:
- `error` - Erros críticos
- `warn` - Avisos
- `info` - Informações gerais
- `debug` - Debug detalhado

### Performance

- Use índices nas consultas frequentes
- Implemente cache para dados estáticos
- Monitore queries lentas
- Use paginação em listagens grandes

## 📈 Roadmap

### Próximas Funcionalidades

- [ ] Autenticação JWT
- [ ] Upload de imagens
- [ ] Sistema de busca avançada
- [ ] Cache Redis
- [ ] Testes automatizados
- [ ] Documentação Swagger
- [ ] Frontend React/Vue
- [ ] Sistema de notificações

### Melhorias Técnicas

- [ ] Rate limiting
- [ ] Validação de entrada
- [ ] Logs estruturados
- [ ] Métricas Prometheus
- [ ] CI/CD pipeline
- [ ] Backup automático

## 🤝 Contribuição

Veja o [README principal](../README.md) para instruções de contribuição.

## 📞 Suporte

- Issues: [GitHub Issues](https://github.com/seu-usuario/dbzada/issues)
- Email: suporte@dbzada.com
- Discord: [Link do servidor] 