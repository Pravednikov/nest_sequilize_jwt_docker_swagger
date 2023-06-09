import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto): Promise<{ token: string }> {
    const user: User = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate: User = await this.userService.get(userDto.email);
    if (candidate) {
      throw new HttpException('Email has been taken', HttpStatus.BAD_REQUEST);
    }

    const hashPassword: string = await bcrypt.hash(userDto.password, 5);
    const user: User = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private generateToken({
    email,
    roles,
    id,
  }: Readonly<Pick<User, 'email' | 'id' | 'roles'>>): { token: string } {
    const payload = { email: email, id: id, roles: roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto): Promise<User> {
    const user: User = await this.userService.get(userDto.email);
    if (user && (await bcrypt.compare(userDto.password, user.password)))
      return user;
    throw new UnauthorizedException({
      message: 'Incorrect email or password',
    });
  }
}
