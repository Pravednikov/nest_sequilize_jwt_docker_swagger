import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { FilesService } from '../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image) {
    const filename = await this.fileService.create(image);
    return await this.postRepository.create({ ...dto, image: filename });
  }
}
