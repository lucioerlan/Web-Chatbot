exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('admin')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {
          user_name: 'admin',
          password: 'admin',
        },
      ]);
    });
};
