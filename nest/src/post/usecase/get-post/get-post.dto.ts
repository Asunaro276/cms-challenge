import { Post } from "/post/domain/entity/post.entity"

export class GetPostInput {
  id: number
}

export class GetPostOutput {
  post: Post
}
