import { Injectable } from '@nestjs/common';
import { NewPost } from '/core/post/domain/entity/post.entity';
import { CreatePostInput } from '/core/post/usecase/create-post/dto';
import { User } from '/core/auth/domain/entity/user.entity';
import { SignInInput } from '/core/auth/usecase/sing-in/dto';

@Injectable()
export class SignInTransformer {
  request(input: User): SignInInput {
    return { user: input };
  }
}
