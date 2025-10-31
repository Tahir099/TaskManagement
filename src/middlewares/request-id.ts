import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export function requestId() {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.header("x-request-id") || uuid();
    (req as any).id = id;
    res.setHeader("x-request-id", id);
    next();
  };
}
