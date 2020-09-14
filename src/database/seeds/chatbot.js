exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('chatbot')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('chatbot').insert([
        {
          code_user: 101040556577358,
          activate: 1,
          code_current: 10100455586922458,
          code_relation: 0,
          code_before: 0,
          input: 'oque e voce',
          output: 'so um chatbot',
        },

        {
          code_user: 101040556577358,
          activate: 1,
          code_current: 10100455586922488,
          code_relation: 0,
          code_before: 0,
          input: 'de onde voce e',
          output: 'polo norte',
        },
      ]);
    });
};
