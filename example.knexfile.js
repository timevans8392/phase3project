
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'phase3project',
      user:     'YOUR-DBUSER-GOES-HERE',
      password: 'YOUR-PASSWORD-GOES-HERE'
    },
    pool: {
      min: 1,
      max: 5
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
