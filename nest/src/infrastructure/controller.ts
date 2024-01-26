import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { GetPostUseCaseImpl } from '/core/post/usecase/get-post/impl';
import { PostDITokens } from '/core/post/domain/token/PostDITokens';
import { GetPostTransformer } from './transformer/get-post.transform';
import { CreatePostTransformer, RequestInput as CreateRequestInput } from './transformer/create-post.transform';
import { CreatePostUseCaseImpl } from '/core/post/usecase/create-post/impl';
import { GetPostListUseCaseImpl } from '/core/post/usecase/get-post-list/impl';
import { GetPostListTransformer } from './transformer/get-post-list.transform';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostDITokens.GetPostUseCase)
    private readonly getPostUseCase: GetPostUseCaseImpl,
    @Inject(PostDITokens.GetPostListUseCase)
    private readonly getPostListUseCase: GetPostListUseCaseImpl,
    @Inject(PostDITokens.CreatePostUseCase)
    private readonly createPostUseCase: CreatePostUseCaseImpl,
    @Inject(PostDITokens.GetPostTransformer)
    private readonly getPostTransformer: GetPostTransformer,
    @Inject(PostDITokens.GetPostTransformer)
    private readonly getPostListTransformer: GetPostListTransformer,
    @Inject(PostDITokens.GetPostTransformer)
    private readonly createPostTransformer: CreatePostTransformer,
  ) {}

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const getPostInput = this.getPostTransformer.request({ id: id });
    const getPostOutput = await this.getPostUseCase.execute(getPostInput);
    const result = this.getPostTransformer.response(getPostOutput);
    return result;
  }
  @Get()
  async getPostList() {
    const getPostListOutput = await this.getPostListUseCase.execute();
    const result = this.getPostListTransformer.response(getPostListOutput);
    return result;
  }
  @Post()
  async createPost(@Body() requestBody: CreateRequestInput) {
    const createPostInput = this.createPostTransformer.request(requestBody);
    await this.createPostUseCase.execute(createPostInput);
  }
}
