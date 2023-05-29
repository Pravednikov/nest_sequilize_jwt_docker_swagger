import { forwardRef, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersRepo } from './users.repo';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepo],
  imports: [
    ClientsModule.register([
      { name: 'COMMUNICATION', transport: Transport.TCP },
    ]),
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => RolesModule),
  ],
  exports: [UsersService, UsersRepo],
})
export class UsersModule {}
