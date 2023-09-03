import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/type.core";
import { User } from "../entity/user.entity";
import { IUserRepository } from "../interfaces/IUser.repository";
import { InternalServerErrorException, NotFoundException } from "../../../shared/errors/all.exception";
import { IDatabaseService } from "../../../core/interface/IDatabase.service";

@injectable()
export class userRepository implements IUserRepository {
  constructor(
    @inject(TYPES.IDatabaseService) private readonly database: IDatabaseService
  ) {}

  async getByUuid(uuid: string): Promise<User> {
    try {
      const userRepo = await this.database.getRepository(User);
      const results = await userRepo.findOne({ where: { uuid } });
      if (results) return results as User;

      throw new NotFoundException('User not found');
    } catch (error: any) {
      if (error instanceof NotFoundException) throw new NotFoundException('User not found');

      throw new InternalServerErrorException(`${error.message}`);
    }
  }
}