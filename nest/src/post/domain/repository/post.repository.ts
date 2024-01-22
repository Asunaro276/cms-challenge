import { Post } from '../entity/post.entity';

export interface PostRepository {
  getAll(): Promise<Post[]>;
  getById(id: number): Promise<Post>;
  create(post: Post): Promise<void>;
  update(post: Post): Promise<void>;
  delete(id: number): Promise<void>;
}
