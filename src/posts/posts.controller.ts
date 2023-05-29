import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as _Post } from './posts.model';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<_Post> {
    return this.postService.create(dto, image);
  }
}
