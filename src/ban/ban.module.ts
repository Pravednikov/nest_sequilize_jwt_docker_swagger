import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { BanController } from './ban.controller';
import { BanService } from './ban.service';

@Module({
  controllers: [BanController],
  providers: [BanService],
  exports: [BanService],
  imports: [SequelizeModule.forFeature([User]), AuthModule, UsersModule],
})
export class BanModule {}
