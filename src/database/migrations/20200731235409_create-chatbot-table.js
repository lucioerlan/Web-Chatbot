exports.up = function(knex) {
  return knex.schema.createTable('chatbot', function(table) {
    table.increments('_id');
    table.bigint('code_user');
    table.bigint('activate').notNullable().defaultTo(1);
    table.bigint('code_current');
    table.bigint('code_relation').notNullable().defaultTo(0);
    table.bigint('code_before').notNullable().defaultTo(0);
    table.string('input');
    table.string('output');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
 
exports.down = function(knex) {
  return knex.schema.dropTable('chatbot');
};