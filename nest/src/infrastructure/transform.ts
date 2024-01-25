import { Injectable } from "@nestjs/common"
import { GetPostInput, GetPostOutput } from "/core/post/usecase/get-post/dto"
import { Post } from "/core/post/domain/entity/post.entity"

@Injectable()
export class PostTransformer {
  request(input: Input): GetPostInput {
    const transformedOutput = {
      id: Number(input.id)
    }
    return transformedOutput
  }
  response(input: GetPostOutput): Result {
    return input
  }
}

export class Input {
  id: string
}

export class Result {
  post: Post
}
