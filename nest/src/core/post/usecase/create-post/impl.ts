import { PostRepository } from '/core/post/domain/repository/post.repository';
import { CreatePostInput } from './dto';
import { CreatePostUseCase } from './interface';
import { ConsoleLogger } from '@nestjs/common';

export class CreatePostUseCaseImpl implements CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async execute(getPostInput: CreatePostInput): Promise<void> {
    await this.postRepository.create(getPostInput.post)
  }
}
