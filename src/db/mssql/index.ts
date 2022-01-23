import { connect ,ConnectionPool } from 'mssql';
import options from './options';

export const getContext = async (): Promise<ConnectionPool>  => {
    try {
        const pool = await connect(options);
        return pool;
    }
    catch(error) {
    }
}

