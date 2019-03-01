//changes applied to the DB
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts',
    function(tbl) {
        tbl.increments();
  
        tbl
            .string('name', 128)
            .notNullable()

        tbl
        .timestamps(true, true)


    })

};
//undo
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts')
};
