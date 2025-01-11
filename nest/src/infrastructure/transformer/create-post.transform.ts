import { Injectable } from "@nestjs/common";
import { NewPost } from "/core/post/domain/entity/post.entity";
import { CreatePostInput } from "/core/post/usecase/create-post/dto";

@Injectable()
export class CreatePostTransformer {
  request(input: NewPost): CreatePostInput {
    return { post: input };
  }
}
