const { request, response } = require("express")

const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {
    async index(request, response) {
        //Selecionar todos os elementos da tabela, adicionar na const ongs e retornar em formato json. 
        const ongs = await connection('ongs').select('*');

        return response.json(ongs)
    },

    async  create(request, response) {
        const { name, email, whatsapp, city, uf} = request.body;

        //Gerar um id de 4 bytes em formato Hexadecimal
        const id = crypto.randomBytes(4).toString('hex');
        
        // A partir da importação da conexão com o bd, gerar uma tabela
        // com as colunas: id, name, email, whatsapp, city e uf. 
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id });
    }
};