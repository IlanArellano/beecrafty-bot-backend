import type { Mode } from "../general";

export interface RegisterBody {
  username: string;
  discord_id: string;
  mode: Mode;
}
