export default () => ({
  db: {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT,
    synchronize: process.env.DB_SYNCHRONIZE,
    type: process.env.DB_TYPE,
    user: process.env.DB_USER,
  },
  jwt: {
    expires: process.env.JWT_EXPIRES,
    secret: process.env.JWT_SECRET,
  },
  node: {
    env: process.env.NODE_ENV,
  },
  server: {
    origin: process.env.SEVER_ORIGIN,
    port: process.env.SERVER_PORT,
  },
});
