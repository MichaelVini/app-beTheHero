// Método up é utilizado para criação de tabelas
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table){
         table.string('id').primary();
         table.string('name').notNullable();
         table.string('email').notNullable();
         table.string('whatsapp').notNullable();
         table.string('city').notNullable();
         table.string('uf', 2).notNullable();
     });
 };
 
 //Método down é utilizado para voltar atrás (desfazer uma ação), neste caso remover uma tabela.
 exports.down = function(knex) {
     return knex.schema.dropTable('ongs');
 };
 