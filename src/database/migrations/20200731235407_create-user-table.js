exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.increments('_id');
    table.bigint('code_user').notNullable();
    table.boolean('activate').notNullable().defaultTo(1);
    table.string('full_name');
    table.string('user_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
 
exports.down = function(knex) {
  return knex.schema.dropTable('user');
};