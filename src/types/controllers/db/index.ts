import { Connection, QueryOptions } from "mysql";

export type ConnectionPromise = Omit<Connection, "query"> & {
  query: (query: string | QueryOptions, params?: any[]) => Promise<any>;
};

export interface DBUsers {
  id: number;
  username: string;
  discord_id: string;
  public_ip: string;
  mode: string | null;
  created_at: Date | null;
}
