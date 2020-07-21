const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

//Gerar a conexão com o banco de dados (conexão de desenvolvimento)
const connection = knex(config);

module.exports = connection;