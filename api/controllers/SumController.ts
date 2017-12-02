import { Request, Response } from "express-serve-static-core";

export async function sum(req: Request, res: Response) {
  const { a, b } = req.query;
  res.send({ result: parseInt(a, 10) + parseInt(b, 10) })
}