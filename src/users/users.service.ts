import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';

import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserEvent } from './dto/create-user.event';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @Inject('COMMUNICATION') private readonly communicationsClient: ClientProxy,
  ) {}

  async createUser(dto: CreateUserDto) {
    this.communicationsClient.emit(
      'user_created',
      new CreateUserEvent(dto.email),
    );

    const [user, role] = await Promise.all([
      this.userRepository.create(dto),
      this.roleService.getRoleByValue('USER'),
    ]);

    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto) {
    const [role, user] = await Promise.all([
      this.roleService.getRoleByValue(dto.value),
      this.userRepository.findByPk(dto.userId),
    ]);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
