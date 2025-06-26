# 🧱 NestJS Monorepo - Auth & URL Shortener Microservices

Este projeto é um **monorepo** baseado em [NestJS](https://nestjs.com/) que segue uma arquitetura de **microserviços**. Ele contém dois serviços principais:

---

## 📦 Serviços

### 🔐 Auth Service (`auth`)
Responsável pela autenticação e gerenciamento de usuários. Suporta:

- Registro de usuários
- Login com JWT
- Validação de token
- Proteção de rotas

### 🔗 Shortener Service (`shortener`)
Serviço de encurtamento de URLs com autenticação via token JWT. Suporta:

- Geração de URLs curtas
- Redirecionamento de links
- Listagem de URLs por usuário
- Armazenamento via banco de dados com Prisma ORM

---

## 🚀 Primeiros Passos

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados em sua máquina:

- [Node.js](https://nodejs.org/) (v20.17 recomendado)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Como rodar o projeto

Após clonar o repositório:

```bash
git https://github.com/RicardoBatistaJr/url-shortener-monorepo.git
cd url-shortener-monorepo
```

1) Instalar dependencias

```bash
npm install
```
2) Construir containers com Docker
```bash
docker compose build -d
```
3) Aplicar o schema do banco de dados (Prisma)
```bash
docker compose exec shortener npx prisma db push --schema=prisma/schema.prisma
```
4) Subir os serviços
```bash
docker compose exec shortener npx prisma db push --schema=prisma/schema.prisma
```

## 🔍 Endpoints principais
📘 Auth Service
POST /auth/register
Registra um novo usuário.

POST /auth/login
Realiza login e retorna um JWT.

GET /auth/profile
Retorna dados do usuário autenticado (requer JWT).

## 🔗 Shortener Service

## POST /shorten
Cria uma URL encurtada.

Autenticação: opcional

Corpo da requisição (application/json):
```bash
{
  "originalUrl": "https://example.com"
}
```
Resposta:

```bash
{
  "shortenedLink": "http://localhost:3001/abc123"
}
```

## GET /:code
Redireciona para a URL original com base no código encurtado.

Exemplo: /abc123 → redireciona para originalUrl.

Autenticação: não requer

## GET /by-user/:userId
Retorna todas as URLs encurtadas por um usuário.

Autenticação: não requer

## DELETE /:code
Deleta (soft delete) uma URL encurtada.

Autenticação: requer JWT

## PUT /:urlId
Atualiza a URL original de um encurtador existente.

Autenticação: requer JWT

Corpo da requisição:
```bash
"https://nova-url.com"
```
Resposta:
```bash
{
  "id": "123",
  "shortCode": "abc123",
  "originalUrl": "https://nova-url.com",
  "clickCount": 42
}
```

