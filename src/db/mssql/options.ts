export default {
  server: process.env.MSSQL_DB_SERVER,
  user: process.env.MSSQL_DB_USER,
  password: process.env.MSSQL_DB_PASSWORD,
  port: Number(process.env.MSSQL_DB_PORT),
  database: process.env.MSSQL_DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};
