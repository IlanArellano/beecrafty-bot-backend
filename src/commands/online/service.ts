import axios, { AxiosResponse } from "axios";
import { ServerStatus } from '../../types';

export const serverStatusServive = async (server: string): Promise<ServerStatus | null> => {
       try {
        const res: AxiosResponse<ServerStatus, any>  = await axios.get(`${process.env.SERVER_STATUS_API}${server}`);
        if(res.status !== 200) return null;
        return res.data;
       } catch (error) {
           return null;
       }
}

export const SERVERS = [process.env.MINECRAFT_SERVER_LOBBY, process.env.MINECRAFT_SERVER_SURVIVAL];