import { Controller, Get, Param } from '@nestjs/common';
import { GetPostUseCase } from '/core/post/usecase/get-post/interface';
import { PostTransformer } from './transform';

@Controller('posts')
export class PostController {
  constructor(
    private readonly getPostUseCase: GetPostUseCase,
    private readonly postTransformer: PostTransformer,
  ) {}

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const getPostInput = this.postTransformer.request({ id: id });
    return await this.getPostUseCase.execute(getPostInput);
  }
}
