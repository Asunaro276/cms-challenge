import { PostRepository } from '/core/post/domain/repository/post.repository';
import { CreatePostInput } from './dto';
import { CreatePostUseCase } from './interface';

export class CreatePostUseCaseImpl implements CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async execute(getPostInput: CreatePostInput): Promise<void> {
    const post = await this.postRepository.create(getPostInput.post)
  }
}
