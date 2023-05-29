import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { User } from '../users/users.model';
import { PostsController } from './posts.controller';
import { Post } from './posts.model';
import { PostsRepo } from './posts.repo';
import { PostsService } from './posts.service';

@Module({
  providers: [PostsService, PostsRepo],
  controllers: [PostsController],
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [PostsService],
})
export class PostsModule {}
