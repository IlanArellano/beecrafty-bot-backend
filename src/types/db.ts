import { IResult } from "mssql";

export interface Error {
  query?: () => Promise<IResult<any>>;
  error?: string;
}

export interface output {
  estatus: boolean;
  output: any;
}

export interface ConnectionError {
  PROTOCOL_CONNECTION_LOST: string;
  ER_CON_COUNT_ERROR: string;
  ECONNREFUSED: string;
}

export const ERROR_PARAMS = "NO_ENOUGH_PARAMS";

export const ERROR_RESPONSE = "BAD_RESPONSE";

export const SP_ERROR = "Error del servidor: ";
