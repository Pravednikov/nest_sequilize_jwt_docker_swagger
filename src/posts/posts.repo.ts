import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

// TODO create and implement new interface
export class PostsRepo {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  public async create(dto: CreatePostDto, filename: string): Promise<Post> {
    return await this.postRepository.create({ ...dto, image: filename });
  }
}
