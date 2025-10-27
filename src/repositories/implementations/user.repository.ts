import { BaseRepository } from "../base/base.repository";
import { User } from "../../generated/prisma";
import { IUserRepository } from "../interfaces/IUserRepository";
import prisma from "../../config/prisma.config";

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
      return this.prismaModel.findUnique({where:{email}})
  }
}
