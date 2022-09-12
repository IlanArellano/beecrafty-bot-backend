export interface RedisRequestHandler {
  ip: string;
  points: number;
  last_attempt: Date | null;
}
