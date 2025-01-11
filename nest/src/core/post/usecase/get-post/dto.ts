import { Post } from "/core/post/domain/entity/post.entity";

export interface GetPostInput {
  id: string;
}

export interface GetPostOutput {
  post: Post;
}
