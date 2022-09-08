export interface PacketType {
  AUTH: number;
  AUTH_RES: number;
  COMMAND: number;
  COMMAND_RES: number;
  COMMAND_END: number;
}

export interface PacketPayload {
  COMMAND_END: string;
}

export interface PacketRead {
  length: number;
  id: number;
  type: number;
  payload: string;
}

export interface RCONPending {
  timer: NodeJS.Timeout;
  payloads: any[];
}

export interface RCONQueque {
  drained: boolean;
  sending: Buffer[];
  pending: Record<string, Partial<RCONPending>>;
}
