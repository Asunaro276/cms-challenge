import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PostTransformer } from './transform';
import { GetPostUseCaseImpl } from '/core/post/usecase/get-post/impl';
import { PostDITokens } from '/core/post/domain/token/PostDITokens';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostDITokens.GetPostUseCase)
    private readonly getPostUseCase: GetPostUseCaseImpl,
    @Inject(PostDITokens.PostTransformer)
    private readonly postTransformer: PostTransformer,
  ) {}

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const getPostInput = this.postTransformer.request({ id: id });
    const getPostOutput = await this.getPostUseCase.execute(getPostInput);
    const result = this.postTransformer.response(getPostOutput)
    return result
  }
}
