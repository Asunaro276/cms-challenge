import { Injectable } from '@nestjs/common';
import { GetPostInput, GetPostOutput } from '/core/post/usecase/get-post/dto';
import { Post } from '/core/post/domain/entity/post.entity';

@Injectable()
export class GetPostTransformer {
  request(input: RequestInput): GetPostInput {
    const transformedOutput = {
      id: String(input.id),
    };
    return transformedOutput;
  }
  response(input: GetPostOutput): Result {
    return input;
  }
}

export class RequestInput {
  id: string;
}

export class Result {
  post: Post;
}
