# Zenclient API
API da aplicação zenclient. Esse projeto faz parte do desafio bemol-digital.

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

## Setup e execução através do Docker container
1. Para rodar o projeto em um container docker, será necessário antes montar a imagem do projeto e banco de dados. Para isso, dentro da pasta raiz do projeto onde se encontra o arquivo Dockerfile e docker-compose.yml, rode o seguinte comando:
```
docker compose build
```
2. Com o container criado, basta iniciá-lo:
```
docker compose up -d
```
3. O último passo é gerar as tabelas do banco de dados. Essa aplicação usa do *Prisma* como *ORM*, então para isso é necessário acessar o terminal da aplicação dentro do container para rodar o comando do *prisma* que irá criar as tabelas. 
	- Acessar o terminal:
	 
   ```
	docker exec -it zenclient-api /bin/bash

  ```
	- Rodar comando para criar as tabelas do banco de dados:
	
   ```
	npx prisma migrate dev
	
  ```
  npm run dev
  ```