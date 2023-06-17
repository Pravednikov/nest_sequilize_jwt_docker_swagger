import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';

import { IUser } from '../interfaces/IUser';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserEvent } from './dto/create-user.event';
import { User } from './users.model';
import { UsersRepo } from './users.repo';

@Injectable()
export class UsersService implements IUser {
  constructor(
    @Inject('COMMUNICATION') private readonly communicationsClient: ClientProxy,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private roleService: RolesService,
    private userRepository: UsersRepo,
  ) {}

  public async create(dto: CreateUserDto): Promise<User> {
    try {
      this.communicationsClient.emit(
        'user_created',
        new CreateUserEvent(dto.email),
      );

      const user: User = await this.userRepository.create(dto);
      await this.roleService.setDefaultRole(user);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  public async get(email: string): Promise<User> {
    return await this.userRepository.get(email);
  }

  public async delete(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }

  public async update(
    id: number,
    option: Partial<User>,
  ): Promise<[affectedRows: number]> {
    return await this.userRepository.update(id, option);
  }
}
