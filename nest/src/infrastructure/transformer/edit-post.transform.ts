import { Injectable } from '@nestjs/common';
import { Post } from '/core/post/domain/entity/post.entity';
import { EditPostInput } from '/core/post/usecase/edit-post/dto';

@Injectable()
export class EditPostTransformer {
  request(input: Post): EditPostInput {
    return { post: input };
  }
}
