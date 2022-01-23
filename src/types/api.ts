interface Debug {
    ping: boolean;
    query: boolean;
    srv: boolean;
    querymismatch: boolean;
    ipinsrv: boolean;
    cnameinsrv: boolean;
    animatedmotd: boolean;
    cachetime: number;
}

interface Motd {
    raw: string[];
    clean: string[];
    html: string[];
}

interface Players {
    online: number;
    max: number;
    list?: string[];
    uuid?: any;
}

interface PluginsMods {
    names: string[];
    raw: string[];
}

interface Info {
    raw: string[];
    clean: string[];
    html: string[];
}


export interface ServerStatus {
        online: boolean;
        ip: string;
        port: number;
        debug: Debug;
        motd?: Motd;
        players?: Players;
        version?: any;
        protocol?: number;
        hostname?: string;
        icon?: string;
        software?: string;
        map?: string;
        gamemode?: string;
        serverid?: string;
        plugins?: PluginsMods;
        mods?: PluginsMods;
        info?: Info;
}

interface Total_Server_Stats {
    totalPlayers: number;
    Players: string[]
    ServersOnline: string[]
}

export interface Error_Response {
    hasError: boolean;
    errorMessage: any;
}

export interface Server_Online_Response extends Error_Response {
    total_server_stats?: Total_Server_Stats;
    servers_stats?: ServerStatus[]
}

export const MINECRAFT_TYPES = {
    java: 'Java',
    bedrock: 'Bedrock',
    unknown: 'Desconocido'
}

type Platform = 'Java' | 'Bedrock' | 'Desconocido';

export interface UserInformation extends Error_Response {
    username?: string;
    activo?: boolean;
    rango?: string;
    platform?: Platform;
    uuid?: string;
    icon_url?: string;
}

export interface Player_API_Response extends Error_Response {
    name?: string;
    id?: string;  
}

export interface Api_Response<T> {
    status: number;
    response: T
}