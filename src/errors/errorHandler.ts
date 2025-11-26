import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { mapPrismaError } from "./prisma";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const prismaError = mapPrismaError(err);
  if (prismaError) {
    err = prismaError;
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      code: err.code,
      ...(err.details && { details: err.details }),
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
