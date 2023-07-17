export default {
  testing: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  local: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
  },
};
