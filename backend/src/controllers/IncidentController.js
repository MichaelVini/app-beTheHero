const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const incidents = await connection('incidents').select('*');

        return response.json(incidents);
    },

    async create(request, response) {
      const { title, description, value } = request.body;

      //acessar o id da ong através do cabeçalho da requisição
      const ong_id = request.headers.authorization;
      
      // Inserir dado na tabela incidents e retornar o id gerado a partir do cadastro
      const [ id ] = await connection('incidents').insert({
          title,
          description,
          value,
          ong_id,
      });
      return response.json({ id });
    },

    async delete(request, response) {
        //Pegar o id do caso.
        const { id } = request.params;
        //Pegar o id da ong.
        const ong_id = request.headers.authorization;
        
        //Buscar um caso através do id do incident na coluna do id da ong e retornar apenas um resultado.
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //Se o ong id do incident selecionado for diferente do ong id que está logado = erro.
        if( incident.ong_id !== ong_id) {
            //Status code HTTP 401 significa que o usuario não tem autorização para fazer está ação.
            return response.status(401).json({ error: 'Operation not permitted.' });
        }

        // Caso contrário, deletar o incident:
        await connection('incidents').where('id', id).delete();
        //retornar uma resposta de sucesso, porém sem conteúdo Status Code HTTP 204
        return response.status(204).send();
    }
};