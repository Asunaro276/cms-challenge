import { Injectable } from "@nestjs/common";
import { Post } from "/core/post/domain/entity/post.entity";
import { GetPostListOutput } from "/core/post/usecase/get-post-list/dto";

@Injectable()
export class GetPostListTransformer {
  response(input: GetPostListOutput): Result {
    return input;
  }
}

export class Result {
  posts: Post[];
}
