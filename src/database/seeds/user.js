exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          code_user: 101040556577358,
          activate: 1,
          full_name: 'admin dev',
          user_name: 'admin',
          email: 'admin.com.br',
          password: 'admin',
        },
      ]);
    });
};
