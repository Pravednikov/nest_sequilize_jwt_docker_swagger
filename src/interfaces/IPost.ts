import { CreatePostDto } from '../posts/dto/create-post.dto';
import { Post } from '../posts/posts.model';

export interface IPost {
  create(dto: CreatePostDto, image: Express.Multer.File): Promise<Post>;
}
