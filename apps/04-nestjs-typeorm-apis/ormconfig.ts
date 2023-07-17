module.exports = {
  type: process.env.DB_DIALECT || "postgres",
  url: process.env.DATABASE_URL,
  charset: "utf8mb4",
  synchronize: false,
  ssl:
    process.env.NODE_ENV !== "local" && process.env.NODE_ENV !== "test"
      ? { rejectUnauthorized: false }
      : false,
  logging: true,
  entities: ["dist/src/app/domain/**/*.entity.js"],
  migrations: ["dist/src/storage/database/migrations/**/*.js"],
  subscribers: ["dist/src/storage/database/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/app/domain/**/*.entity.js",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
  migrationsTransactionMode: "each",
};
