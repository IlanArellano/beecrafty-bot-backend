import { Request, Response } from "express";
import { getServerContext } from "../../db";

export const getTest = async (req: Request, res: Response) => {
  const pool = getServerContext();
  try {
    const query = await pool.query("DELETE FROM test WHERE id = 2");
    console.log({ query });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    pool.end();
  }
};
