import { Session, User } from "../../generated/prisma";
import { IBaseRepository } from "./IBaseRepository";

export interface ISessionRepository extends IBaseRepository<Session> {
  findByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<(Session & { user: User }) | null>;

  findByRefreshToken(token: string): Promise<(Session & { user: User }) | null>;
}
