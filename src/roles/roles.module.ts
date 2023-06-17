import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesRepo } from './roles.repo';
import { RolesService } from './roles.service';
import { UserRoles } from './user-roles.model';

@Module({
  providers: [RolesService, RolesRepo],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  exports: [RolesService, RolesRepo],
})
export class RolesModule {}
