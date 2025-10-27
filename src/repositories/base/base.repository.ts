import { IBaseRepository } from "../interfaces/IBaseRepository";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected constructor(protected readonly prismaModel: any) {}

  async findAll(): Promise<T[]> {
    return this.prismaModel.findMany();
  }

  async findById(id: string): Promise<T | null> {
    return this.prismaModel.findUnique({ where: { id } });
  }

  async create(data: Partial<T>): Promise<T> {
    return this.prismaModel.create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.prismaModel.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prismaModel.delete({ where: { id } });
  }
}
