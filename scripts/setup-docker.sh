#!/bin/bash

echo "🚀 Configurando Docker para o projeto DBZada..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Iniciando..."
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# Verificar se o usuário está no grupo docker
if ! groups $USER | grep -q docker; then
    echo "⚠️  Usuário não está no grupo docker. Adicionando..."
    sudo usermod -aG docker $USER
    echo "✅ Usuário adicionado ao grupo docker."
    echo "🔄 Por favor, faça logout e login novamente para aplicar as permissões."
    echo "   Ou execute: newgrp docker"
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp env.example .env
    echo "✅ Arquivo .env criado!"
fi

# Navegar para a pasta docker
cd docker

# Iniciar os containers
echo "🐳 Iniciando containers do DBZada..."
docker-compose up -d

if [ $? -eq 0 ]; then
    echo "✅ Containers iniciados com sucesso!"
    echo ""
    echo "🌐 Acessos:"
    echo "   PostgreSQL: localhost:5432"
    echo "   pgAdmin: http://localhost:8080"
    echo "   Email: admin@dbzada.com"
    echo "   Senha: admin123"
    echo ""
    echo "📊 Para ver os logs: cd docker && docker-compose logs -f"
    echo "🛑 Para parar: cd docker && docker-compose down"
else
    echo "❌ Erro ao iniciar containers."
    echo "🔍 Verifique os logs: cd docker && docker-compose logs"
fi