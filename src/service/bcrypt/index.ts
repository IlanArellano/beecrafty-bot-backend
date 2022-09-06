import bcrypt from "bcrypt";

const saltRounds: number = 10;
export const GenerateHash = async (data: string): Promise<string> =>
  await bcrypt.hash(data, saltRounds);

export const VerifyToken = async (token: string): Promise<boolean> =>
  await bcrypt.compare(process.env.API_TOKEN_SECRET, token);
