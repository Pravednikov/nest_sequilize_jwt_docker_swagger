import { InjectModel } from '@nestjs/sequelize';

import { ICRUD } from '../interfaces/ICRUD';
import { Role } from '../roles/roles.model';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

export class UsersRepo implements ICRUD {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  public async get(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  public async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.create(dto);
  }

  public async getAll(): Promise<User[]> {
    return this.userRepository.findAll({ include: { all: true } });
  }

  public async delete(id): Promise<number> {
    return this.userRepository.destroy({ where: { id } });
  }

  public async update(
    id: number,
    option: Partial<User>,
  ): Promise<[affectedRows: number]> {
    return this.userRepository.update(option, { where: { id } });
  }

  public async findByPk(userId: number): Promise<User> {
    return this.userRepository.findByPk(userId);
  }

  // think about creating a new class user_role.repo to work with related tables
  // TODO 1 user_role.repo
  public async addRole(user: User, role: Role): Promise<void> {
    await user.$add('role', role.id);
    user.save();
  }

  // TODO 2 user_role.repo
  public async setRole(user: User, role: Role): Promise<void> {
    await user.$set('roles', [role.id]);
    user.save();
  }
}
