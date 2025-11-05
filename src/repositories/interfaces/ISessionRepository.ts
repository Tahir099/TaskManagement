import { Session, User } from "../../generated/prisma";

export interface ISessionRepository {
  findByUserIdAndToken(
    userId: string,
    token: string,
    
  ): Promise<(Session & { user: User }) | null>;

}




