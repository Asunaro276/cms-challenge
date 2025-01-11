import { NewPost, Post } from "../entity/post.entity";

export interface PostRepository {
  getAll(): Promise<Post[]>;
  getById(id: string): Promise<Post>;
  create(post: NewPost): Promise<void>;
  update(post: Post): Promise<void>;
  delete(id: string): Promise<void>;
}
