import { Request, Response } from 'express';
import { serverStatusServive, SERVERS } from './service';
import { Messages } from '../../messages';
import { Server_Online_Response } from '../../types';

export const getServerStatus = async (req: Request, res: Response) => {
    try {
        let servers_stats = await Promise.all(SERVERS.map(serverStatusServive));

        if(!servers_stats || servers_stats.length === 0) return  res.status(404).json({ error: true, message: Messages.GET_SERVER_STATUS_ERROR_MESSAGE});

        let totalPlayers: number = 0;
        let Players: string[] = [];
        let ServersOnline: string[] = [];

        servers_stats.filter(el => el != null).forEach((el, i) => {
            totalPlayers += el.players?.online ?? 0;
            Players.push(...el.players?.list ?? []);
            Players = [...new Set(Players)];
            ServersOnline.push(el.motd?.raw[0] ?? `${Messages.SERVER_NAME}_server_${i+1}`);
        });

        const total_server_stats = {
            totalPlayers,
            Players,
            ServersOnline
        }

        const response: Server_Online_Response = {
            total_server_stats,
            servers_stats,
            hasError: false,
            errorMessage: ""
        }

        res.status(200).json(response);

    } catch (error) {
        const response: Server_Online_Response = {
            hasError: true,
            errorMessage: error
        }
        res.status(500).json(response);
    }
}