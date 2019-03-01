
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Shane', cohort_id: 1 },
        {name: 'Suri', cohort_id: 2 },
        {name: 'Ponyo', cohort_id: 3 }
      ]);
    });
};
