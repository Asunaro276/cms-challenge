import { Controller, Get, Param } from '@nestjs/common';
import { GetPostUseCase } from '/post/usecase/get-post/get-post.usecase';
import { PostTransformer } from '../datatransformer/post.transform';

@Controller('posts')
export class PostController {
  constructor(
    private readonly getPostUseCase: GetPostUseCase,
    private readonly postTransformer: PostTransformer
  ) {}

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const getPostInput = this.postTransformer.transformFromRequest({ id: id })
    return await this.getPostUseCase.execute(getPostInput);
  }
}
