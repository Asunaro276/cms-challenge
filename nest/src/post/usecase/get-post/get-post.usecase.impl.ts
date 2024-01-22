import { Post } from '../../post/domain/entity/post.entity';
import { GetPostUseCase } from '/domain/usecase/get-post.usecase';
import { applyMixins } from '/util/mixin';

export class GetPostUseCaseImplBase implements GetPostUseCase {
  async execute(id: number): Promise<Post> {}
}
