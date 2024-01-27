import { EditPostInput } from './dto';
import { EditPostUseCase } from './interface';
import { PostRepository } from '/core/post/domain/repository/post.repository';

export class EditPostUseCaseImpl implements EditPostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async execute(getPostInput: EditPostInput): Promise<void> {
    await this.postRepository.update(getPostInput.post)
  }
}
