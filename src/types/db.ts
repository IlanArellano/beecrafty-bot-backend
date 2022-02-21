export interface output {
  estatus: boolean;
  output: any;
}

export interface MySQLNoResOutput {
  status: number;
  message: string;
} 

export interface ConnectionError {
  PROTOCOL_CONNECTION_LOST: string;
  ER_CON_COUNT_ERROR: string;
  ECONNREFUSED: string;
  EHOSTUNREACH: string;
};

export interface DBConnectStatus {
  success: boolean;
  message?: string;
}

export interface MySQLOptions {
    connectionLimit: number,
    host: string,
    user: string,
    port: number,
    password: string,
    database: string,
};

export const ERROR_PARAMS = "NO_ENOUGH_PARAMS";

export const ERROR_RESPONSE = "BAD_RESPONSE";

export const SP_ERROR = "Error del servidor: ";

export const DB_DATABASES = {
  SERVER: "Server",
  AUTHME: "Authme",
  LUCKPERMS: "LuckPerms"
}
