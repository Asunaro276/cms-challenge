import { Post } from '../../domain/entity/post.entity';

export interface GetPostUseCase {
  execute(id: number): Promise<Post>;
}
