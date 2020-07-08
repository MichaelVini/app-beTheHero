const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const routes = express.Router();

//Rota para listar todas as ongs do banco de dados
routes.get('/ongs', OngController.index);
//Rota para criar tabela do tipo ONG e retornar um id.
routes.post('/ongs', OngController.create);

//Rota para criar tabela do tipo INCIDENTS e retornar um id.
routes.post('/incidents', IncidentController.create);
//Rota para listar tados os INCIDENTS do banco de dados.
routes.get('/incidents', IncidentController.index);
//Rota para deletar um incident de acordo com seu id.
routes.delete('/incidents/:id', IncidentController.delete);

//Permitir que as rotas sejam exportadas
module.exports = routes;