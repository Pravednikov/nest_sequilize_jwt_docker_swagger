import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IRole } from '../interfaces/IRole';
import { User } from '../users/users.model';
import { UsersRepo } from '../users/users.repo';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesRepo } from './roles.repo';

@Injectable()
export class RolesService implements IRole {
  constructor(
    private userRepository: UsersRepo,
    private roleRepository: RolesRepo,
  ) {}

  public async create(dto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(dto);
  }

  public async get(value: string): Promise<Role> {
    return await this.roleRepository.get(value);
  }

  public async delete(id: number): Promise<number> {
    return await this.roleRepository.delete(id);
  }

  public async update(
    id: number,
    option: Partial<Role>,
  ): Promise<[affectedRows: number]> {
    return await this.roleRepository.update(id, option);
  }

  public async add({ value, userId }: AddRoleDto): Promise<{ msg: string }> {
    const [role, user] = await Promise.all([
      this.get(value),
      this.userRepository.findByPk(userId),
    ]);

    if (role && user) {
      await this.userRepository.addRole(user, role);
      return { msg: 'Role has been added' };
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  public async setDefaultRole(user: User): Promise<void> {
    const role = await this.get('USER');
    await this.userRepository.setRole(user, role);
  }
}
