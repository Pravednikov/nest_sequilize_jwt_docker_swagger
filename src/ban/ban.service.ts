import { Injectable } from '@nestjs/common';

import { IBan } from '../interfaces/IBan';
import { UsersRepo } from '../users/users.repo';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class BanService implements IBan {
  constructor(private userRepository: UsersRepo) {}

  public async ban(dto: BanUserDto): Promise<[affectedRows: number]> {
    return await this.userRepository.update(dto.userId, {
      banned: true,
      banReason: dto.banReason,
    });
  }
}
