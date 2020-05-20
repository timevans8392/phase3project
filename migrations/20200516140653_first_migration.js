
exports.up = function(knex) {
  return knex.schema
    .createTable('todolists', function(table) {
        table.increments().primary()
        table.string('uuid').notNullable()
        table.string('name').notNullable()
    })
    .createTable('todoitems', function(table) {
        table.increments().primary()
        table.string('uuid').notNullable()
        table.string('name').notNullable()
        table.integer('todolist_id').unsigned()
        table.foreign('todolist_id').references('todolists.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('todoitems').dropTable('todolists')
};
