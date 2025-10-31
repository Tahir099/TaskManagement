import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(`Endpoint ${req.originalUrl} not found`, 404));
};
