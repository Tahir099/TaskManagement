import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { config } from "../config/index";
import { ISessionRepository } from "../repositories/interfaces/ISessionRepository";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; roleId: string };
  sessionId?: string;
}

export function createAuthenticateMiddleware(
  sessionRepository: ISessionRepository
) {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ) => {
    const auth = req.header("Authorization");
    if (!auth?.startsWith("Bearer "))
      return next(new AppError("Unauthorized", 401));

    const token = auth.slice(7);

    try {
      const payload = jwt.verify(token, config.jwt.accessSecret) as {
        userId: string;
      };

      const session = await sessionRepository.findByUserIdAndToken(
        payload.userId,
        token
      );

      if (!session || !session.isActive || session.expiresAt < new Date()) {
        return next(new AppError("Session expired or invalid", 401));
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        roleId: session.user.roleId,
      };
      req.sessionId = session.id;

      next();
    } catch {
      next(new AppError("Invalid token", 401));
    }
  };
}
