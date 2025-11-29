import prisma from "../../config/prisma.config";
import { Session, User } from "../../generated/prisma";
import { BaseRepository } from "../base/base.repository";
import { ISessionRepository } from "../interfaces/ISessionRepository";

export class SessionRepository
  extends BaseRepository<Session>
  implements ISessionRepository
{
  constructor() {
    super(prisma.session);
  }

  findByUserIdAndToken(
    userId: string,
    token: string
  ): Promise<(Session & { user: User }) | null> {
    return this.prismaModel.findFirst({
      where: { userId: userId, accessToken: token },
      select: {
        id: true,
        expiresAt: true,
        isActive: true,
        user: { select: { id: true, email: true, roleId: true } },
      },
    });
  }

  findByRefreshToken(
    token: string
  ): Promise<(Session & { user: User }) | null> {
    return this.prismaModel.findFirst({
      where: { refreshToken: token },
      include: { user: true },
    });
  }
}
