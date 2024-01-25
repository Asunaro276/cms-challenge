import { Injectable } from '@nestjs/common';
import { Post } from '/core/post/domain/entity/post.entity';
import { CreatePostInput } from '/core/post/usecase/create-post/dto';

@Injectable()
export class CreatePostTransformer {
  request(input: RequestInput): CreatePostInput {
    return input;
  }
}

export class RequestInput {
  post: Post
}
