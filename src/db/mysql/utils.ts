import { MysqlError, Connection, createConnection } from "mysql";
import { promisify } from "util";
import {
  ConnectionError,
  CONSOLE_COLORS,
  MySQLOptions,
  DBConnectStatus,
} from "../../types";

const errorDictionary: ConnectionError = {
  PROTOCOL_CONNECTION_LOST: "Database connection was closed.",
  ER_CON_COUNT_ERROR: "Database has to many connections",
  ECONNREFUSED: "Database connection was refused",
  EHOSTUNREACH: "Cant connect to database",
};
export const callbackConnection = (
  err: MysqlError,
  context: Connection,
  server: string
): void => {
  if (err) {
    const errorMessage: string =
      errorDictionary[err.code as keyof ConnectionError];
    console.log({ error: err, errorMessage });
    return;
  }

  console.log(
    `${CONSOLE_COLORS.BgGreen}DB ${server} is Connected: DB_ID: ${context.threadId}${CONSOLE_COLORS.Reset}`
  );

  return;
};

/** Crea una instancia de conexion a la base de datos pasandole las opciones de conexion */
export const getContext = (options: MySQLOptions) => {
  const context = createConnection(options);

  // Promisify Pool Querys
  // @ts-ignore: Unreachable code error
  context.query = promisify(context.query);

  return context;
};

export const EndConnectionMessage = (server: string) =>
  console.log(
    `${CONSOLE_COLORS.BgGreen}DB ${server} Connection was closed successfully${CONSOLE_COLORS.Reset}`
  );

export const MYSQL_CONN_STATES: string[] = ["connected", "authenticated"];

export const MYSQL_DISCONN_STATES: string[] = [
  "disconnected",
  "protocol_error",
];
