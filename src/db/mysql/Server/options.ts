import { ConnectionConfig } from "mysql";

const options: ConnectionConfig = {
  host: process.env.MYSQL_DB_SERVER,
  user: process.env.MYSQL_SERVER_DB_USER,
  port: Number(process.env.MYSQL_DB_PORT),
  password: process.env.MYSQL_SERVER_DB_PASSWORD,
  database: process.env.MYSQL_SERVER_DB_DATABASE,
  typeCast: (field, defaultType) => {
    if (field.type === "BIT" && field.length === 1) {
      const bytes = field.buffer();
      return bytes && bytes[0] === 1;
    }

    return defaultType();
  },
};
export default options;
