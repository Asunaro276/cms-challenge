import { Post } from "/core/post/domain/entity/post.entity"

export interface GetPostInput {
  id: number
}

export interface GetPostOutput {
  post: Post
}
