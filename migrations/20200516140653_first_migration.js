
exports.up = function(knex) {
  return knex.schema
    .createTable('list', function(table) {
        table.increments().primary()
        table.string('uuid', 3).notNullable()
        table.string('name', 3).notNullable()
        table.timestamp('ctime', 3).notNullable()
        table.timestamp('ntime', 3).notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('list')
};
