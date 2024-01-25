import { Post } from '/post/domain/entity/post.entity';
import { GetPostUseCase } from '/post/usecase/get-post/interface';

export class GetPostUseCaseImpl implements GetPostUseCase {
  async execute(id: number): Promise<Post> {
    return 
  }
}
