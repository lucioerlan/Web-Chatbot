exports.up = function(knex) {
  return knex.schema.createTable('admin', function(table) {
    table.increments('_id');
    table.string('user_name').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
 
exports.down = function(knex) {
  return knex.schema.dropTable('admin');
};