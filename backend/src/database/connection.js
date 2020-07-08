const knex = require('knex');
const configuration = require('../../knexfile');

//Gerar a conexão com o banco de dados (conexão de desenvolvimento)
const connection = knex(configuration.development);

module.exports = connection;