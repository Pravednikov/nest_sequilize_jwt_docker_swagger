import { Injectable } from '@nestjs/common';

import { FilesService } from '../files/files.service';
import { IPost } from '../interfaces/IPost';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { PostsRepo } from './posts.repo';

@Injectable()
export class PostsService implements IPost {
  constructor(
    private postRepository: PostsRepo,
    private readonly fileService: FilesService,
  ) {}

  public async create(
    dto: CreatePostDto,
    image: Express.Multer.File,
  ): Promise<Post> {
    const filename: string = await this.fileService.create(image);
    return await this.postRepository.create(dto, filename);
  }
}
