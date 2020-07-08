const { index } = require("./OngController");
const connection = require("../database/connection");

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        //Buscar todos os incidents criados pelo ong id logado.
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

         return response.json(incidents);   
    }
}