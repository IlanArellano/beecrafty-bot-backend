import { connect ,ConnectionPool } from 'mssql';
import options from './options';

export const getMSSContext = async (): Promise<ConnectionPool>  => {
    try {
        const pool = await connect(options);
        return pool;
    }
    catch(error) {
    }
}

