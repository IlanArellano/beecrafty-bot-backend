export default {
  connectionLimit: 10,
  host: process.env.MYSQL_DB_SERVER,
  user: process.env.MYSQL_SERVER_DB_USER,
  port: Number(process.env.MYSQL_DB_PORT),
  password: process.env.MYSQL_SERVER_DB_PASSWORD,
  database: process.env.MYSQL_SERVER_DB_DATABASE,
};
