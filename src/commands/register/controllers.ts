import { Request, Response } from 'express';
import { getContext } from '../../db';

export const getRegister = async (req: Request, res: Response) => {
    try {
        const pool = await getContext();
        const response = await pool.query('SELECT * FROM usuarios');
        console.log(response.recordset);

        res.status(201).json({ message: 'Siiiiiii'});
    } catch (error) {
        res.status(500).json({ message: 'NOOOOOO', error});        
    }
}