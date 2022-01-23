import mysql from 'mysql';
import options from './options';
import { promisify } from 'util';
import { ConnectionError } from '../../../types';


const getAuthMeContext = mysql.createPool(options);
const optionsString: string = JSON.stringify(options);

const errorDictionary: ConnectionError = {
  'PROTOCOL_CONNECTION_LOST': 'Database connection was closed.',
  'ER_CON_COUNT_ERROR': 'Database has to many connections',
  'ECONNREFUSED': 'Database connection was refused'
}

getAuthMeContext.getConnection((err, connection) => {
  if (err) {
    const errorMessage: string = errorDictionary[err.code as keyof ConnectionError];
    console.error(errorMessage, optionsString);
    throw new Error(errorMessage);
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

// Promisify Pool Querys
// @ts-ignore: Unreachable code error
getAuthMeContext.query = promisify(getAuthMeContext.query);

export { getAuthMeContext };