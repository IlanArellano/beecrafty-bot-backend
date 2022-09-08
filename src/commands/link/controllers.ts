import { Request, Response } from 'express';
import { getServerContext, callbackConnection, EndConnectionMessage } from '../../db';
import { DB_DATABASES, LinkBody, MySQLNoResOutput } from '../../types';
import { CheckEmptyValue } from '../../utils';
import { Messages } from '../../messages';
import { v4 as uuidv4 } from 'uuid';

export const postLink = async (req: Request, res: Response) => {
    const conn = getServerContext();
    try {
        conn.connect((err) => callbackConnection(err, conn, DB_DATABASES.SERVER));

        const body: LinkBody = req.body;

        if(CheckEmptyValue(body))
        return res.status(400).json({
            status: 0,
            message: Messages.BAD_RESPONSE_VALUE_EMPTY
        });

        const uuid: string = uuidv4();
        const query = await conn.query('CALL LINK_DISCORD_USERNAME(?,?,?,?,?)', [uuid, body.username, body.username_discord, body.username_discord_id, body.ip]);
        // @ts-ignore: Unreachable code error
        const finalQuery: MySQLNoResOutput[] = query[0] as MySQLNoResOutput[];
        console.log(finalQuery[0].status.toString());
        res.status(200).json(finalQuery[0].status.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: true, message: error});        
    }
    finally {
       if(conn.state === "connected" || conn.state === "authenticated") {
        conn.end();
        EndConnectionMessage(DB_DATABASES.SERVER); 
       } 
    }
}