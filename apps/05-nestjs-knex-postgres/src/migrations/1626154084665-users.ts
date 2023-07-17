exports.up = function (knex: any) {
  return knex.schema.createTable('users', function (table: any) {
    table.increments('id');
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email', 255).unique().notNullable();
  });
};

exports.down = function (knex: any) {
  return knex.schema.dropTable('users');
};
