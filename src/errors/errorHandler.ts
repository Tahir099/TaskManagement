import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      code: err.code,
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
