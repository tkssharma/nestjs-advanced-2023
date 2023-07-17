exports.seed = function (knex: any) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          firstName: 'firstName #1',
          lastName: 'lastName #1',
          email: 'example1@nest.it',
        },
        {
          id: 2,
          firstName: 'firstName #2',
          lastName: 'lastName #2',
          email: 'example2@nest.it',
        },
        {
          id: 3,
          firstName: 'firstName #3',
          lastName: 'lastName #3',
          email: 'example3@nest.it',
        },
      ]);
    });
};
