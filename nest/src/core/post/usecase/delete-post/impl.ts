import { DeletePostUseCase } from './interface';
import { DeletePostInput } from './dto';
import { PostRepository } from '/core/post/domain/repository/post.repository';

export class DeletePostUseCaseImpl implements DeletePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async execute(getPostInput: DeletePostInput): Promise<void> {
    await this.postRepository.delete(getPostInput.id)
  }
}
