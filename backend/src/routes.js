const express = require('express');
const crypto = require('crypto');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/ongs', async (request, response) => {
    const { name, email, whatsapp, city, uf} = request.body;

    //Gerar um id de 4 bytes em formato Hexadecimal
    const id = crypto.randomBytes(4).toString('hex');

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
});

//Permitir que as rotas sejam exportadas
module.exports = routes;