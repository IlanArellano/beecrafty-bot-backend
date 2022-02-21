import { Request, Response } from 'express';
import { getAuthMeContext } from '../../db';


export const getTest = async (req: Request, res: Response) => {
    const pool = getAuthMeContext();
    try {
        const query = await pool.query('SELECT * FROM authme');
        console.log(query);
        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({error});
    }
    finally {
        pool.end();
    }
}