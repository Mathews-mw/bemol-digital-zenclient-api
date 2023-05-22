# Zenclient API
API da aplicação zenclient. Esse projeto faz parte do desafio bemol-digital.

## Setup e execução através do Docker container
Para rodar o projeto em um container docker, será necessário antes montar a imagem do projeto e banco de dados. 
1. Dentro da pasta raiz do projeto onde se encontra o arquivo *Dockerfile* e *docker-compose.yml*, rode o seguinte comando:

```bash
docker compose build
```
2. Com o container criado, basta iniciá-lo:

```bash
docker compose up -d
```
3. O último passo é gerar as tabelas do banco de dados. Essa aplicação usa do *Prisma* como *ORM*, então para isso é necessário acessar o terminal da aplicação dentro do container para rodar o comando do *prisma* que irá criar as tabelas. 

- Acessar o terminal:
  
```bash
docker exec -it zenclient-api /bin/bash
```
- Rodar comando para criar as tabelas do banco de dados:

```bash
npx prisma migrate dev
```
## Recursos da aplicação
As principais caracterísitcas são:
- API desenvolvida em NodeJS;
- Fastify Server;
- Prisma (ORM);
- Docker containers;
- JWT Auth / Refresh token;
- Testes unitários e Testes E2E;
- Vitest;
- Git Actions para os testes; 
- Postgres para banco de dados;

## Sobre a aplicação
Essa aplicação é um simples CRUD para cadastro, edição, listagem de usuários e autenticação. A aplicação é usada por outro serviço, no qual complementa esse desafio. 

## Testes

A API possui testes que verificam o bom funcionamento das suas funcionalidades. Há dois tipos de testes, os unitários e os teste de ponta a ponta (E2E).

Testes unitários:

- Esses testes verificam as principais funcionalidades da aplicação em relação às regras de negócio. Cada teste unitário é isolado, um não depende do outro e não há conexão com o banco de dados para esse tipo de teste. 

- Para rodar esses teste, é necessário acessar o terminal da aplicação para rodar o script de teste. 

1. Acessando o terminal:

```bash
docker exec -it zenclient-api /bin/bash
```
2. Rodando os testes unitários:

```bash
npm run test
```
Testes E2E

- Esses testes verificam todo fluxo de uma funcionalidade na aplicação. Desde as requisições http, teste das rotas,  regras de negócios, até de fato a inserção de dados no banco. 

- Para rodar esses teste, é necessário acessar o terminal da aplicação para rodar o script de teste.

1. Acessando o terminal:

```bash
docker exec -it zenclient-api /bin/bash
```

2. Rodando os testes unitários

```bash
npm run test:e2e
```