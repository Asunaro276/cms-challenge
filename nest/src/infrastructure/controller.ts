import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';

import { NewPost, Post as PostType } from '/core/post/domain/entity/post.entity';
import { PostDITokens } from '/core/post/domain/token/PostDITokens';
import { GetPostUseCaseImpl } from '/core/post/usecase/get-post/impl';
import { EditPostUseCaseImpl } from '/core/post/usecase/edit-post/impl';
import { CreatePostUseCaseImpl } from '/core/post/usecase/create-post/impl';
import { GetPostListUseCaseImpl } from '/core/post/usecase/get-post-list/impl';

import { GetPostTransformer } from './transformer/get-post.transform';
import { CreatePostTransformer } from './transformer/create-post.transform';
import { GetPostListTransformer } from './transformer/get-post-list.transform';
import { EditPostTransformer } from './transformer/edit-post.transform';


@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostDITokens.GetPostUseCase)
    private readonly getPostUseCase: GetPostUseCaseImpl,
    @Inject(PostDITokens.GetPostListUseCase)
    private readonly getPostListUseCase: GetPostListUseCaseImpl,
    @Inject(PostDITokens.CreatePostUseCase)
    private readonly createPostUseCase: CreatePostUseCaseImpl,
    @Inject(PostDITokens.EditPostUseCase)
    private readonly editPostUseCase: EditPostUseCaseImpl,

    @Inject(PostDITokens.GetPostTransformer)
    private readonly getPostTransformer: GetPostTransformer,
    @Inject(PostDITokens.GetPostTransformer)
    private readonly getPostListTransformer: GetPostListTransformer,
    @Inject(PostDITokens.CreatePostTransformer)
    private readonly createPostTransformer: CreatePostTransformer,
    @Inject(PostDITokens.EditPostTransformer)
    private readonly editPostTransformer: EditPostTransformer,
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

  @Post('create')
  async createPost(@Body() requestBody: NewPost) {
    const createPostInput = this.createPostTransformer.request(requestBody);
    await this.createPostUseCase.execute(createPostInput);
  }

  @Put('edit')
  async editPost(@Body() requestBody: PostType) {
    const editPostInput = this.editPostTransformer.request(requestBody);
    await this.editPostUseCase.execute(editPostInput);
  }

}
