# OnFly Teste - API REST com Nest.js, Prisma e Postgres

Este é um projeto de API REST desenvolvido como parte do teste técnico para a empresa OnFly. A aplicação foi construída utilizando Nest.js como framework, Prisma como ORM e Postgres como banco de dados. O teste consiste na implementação de autenticação de usuário e operações CRUD para despesas.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado em sua máquina. Clone o repositório para sua máquina local e execute os seguintes comandos:

```bash
git clone https://github.com/LeonardoPell/onflyteste.git
cd onflyteste
npm install
```

Além disso, é necessário ter o Docker instalado para criar e inicializar o contêiner do banco de dados Postgres. Certifique-se de que o Docker está em execução e execute o seguinte comando:

```bash
sudo ./initializeDatabase.sh
```

caso esteja no Windows, os comandos docker são:

```bash
docker network create --driver bridge postgres-network
docker run -d --name postgres-container --network=postgres-network -e POSTGRES_DB=onflyTeste -e POSTGRES_USER=onflyTeste -e POSTGRES_PASSWORD=onflyTeste123 -p 5432:5432 postgres
```

Lembrando que não adicionei nenhum volume ao container, pois não achei necessário a persistência de dados para o teste.

Esse script criará uma rede Docker chamada `postgres-network` e inicializará um contêiner Postgres com as configurações necessárias.

Em seguida, execute o comando para rodar as migrations necessárias do prisma

```bash
npm run prisma:start
```

Com isso, será adicionado 2 usuarios ao banco de dados da aplicação e criada as tabelas necessárias.

Em seguida, execute o comando para iniciar a aplicação:

```bash
npm run start:dev
```

## Obtenha Token de Acesso:

Acesse a rota GET: 
```bash
http://localhost:3000/auth/token/${id_do_usuario}
```
para receber o token de acesso às rotas do sistema.

## Rotas Disponíveis:

```bash
GET: http://localhost:3000/expense/${userId} - Receber todas as despesas do usuário.
POST: http://localhost:3000/expense/ - Criar uma nova despesa.
PATCH: http://localhost:3000/expense/${expenseId} - Editar uma despesa existente.
DELETE: http://localhost:3000/expense/${expenseId} - Deletar uma despesa.
```

## Envio de E-mail:

Ao cadastrar uma despesa, será enviado um e-mail para o usuário vinculado. O e-mail será enviado para o endereço "onflytesteleonardo@gmail.com". Se desejar receber o e-mail em um endereço diferente, edite o e-mail do usuário no banco de dados, pois não foi criado rota para adicionar usuarios.

## Envio de E-mail:

para os testes unitarios, basta rodar o comando

```bash
npm run test
```

Bom trabalho! 💙
