import { Connection, QueryOptions } from "mysql";
import type { Mode } from "../general";

export type ConnectionPromise = Omit<Connection, "query"> & {
  query: (query: string | QueryOptions, params?: any[]) => Promise<any>;
};

export interface DBUsers {
  id: number;
  username: string;
  discord_id: string;
  public_ip: string;
  mode: Mode | null;
  active: boolean | null;
  inactive_reason: string | null;
  attempts: number | null;
  created_at: Date | null;
}
