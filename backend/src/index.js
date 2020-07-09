const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();

//Permitir quais endereços podem acessar a aplicação. (Como está em desenvolvimento, todos podem acessar por enquanto)
app.use(cors());

//informar ao express que estamos utilizando Json para requisições.
app.use(express.json());

app.use(routes);

app.listen(3333);
/* 
    Rota/Recurso
    Ex rota =>  http://localhost:3333/users
    Ex recurso => /users 
*/
/* 
    MÉTODOS HTTP:
    - GET: Buscar/listar uma informação do back-end.
    -POST: Criar uma informação no back-end.
    -PUT: Alterar uma informação no back-end.
    -DELETE: Deletar uma informação no back-end.
*/ 
/* 
    Tipos de parâmetros:
    -Query Params: Parãmetros enviados na rota após "?" (Filtros, paginação).
    -Route Params: Parâmetros utilizados para identificar recursos.
    -Request Body: Corpo da requisição, utilizado para criar ou alterar recursos.
*/
/*
    BANCO DE DADOS:
    SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
    NoSQL: MongoDB, CouchDB ...
*/
/*
    knex: query builder => Escrever comandos de Banco de Dados (SQL) com JS. (Aceita qualquer banco de dados SQL)
*/
/*
    migrations: Serve para monitorar as tabelas (criação/edição) através do histórico.
*/

