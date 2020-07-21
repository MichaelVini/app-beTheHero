const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Rota para listar todas as ongs do banco de dados
routes.get('/ongs', OngController.index);

//Rota para criar tabela do tipo ONG e retornar um id.
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

//Rota para criar tabela do tipo INCIDENTS e retornar um id.
routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

//Rota para listar tados os INCIDENTS do banco de dados.
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);


//Rota para deletar um incident de acordo com seu id.
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

//Rota para listar os incidents do profile logado.
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}), ProfileController.index);

//Rota para criar login
routes.post('/sessions', SessionController.create);


//Permitir que as rotas sejam exportadas
module.exports = routes;