const connection = require('../database/connection');
const { response } = require('express');

module.exports = {
    async create(request, response){
        // Buscar o id através do corpo da requisição
        const { id } = request.body;

        //Buscar o nome da ong através do id e retornar apenas um resultado com o first()
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();

        //Caso a ONG n exista
        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        //Caso exista
        return response.json(ong);
    }
}