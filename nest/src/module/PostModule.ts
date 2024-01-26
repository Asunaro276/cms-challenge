import { Module, Provider } from '@nestjs/common';
import { PostController } from '/infrastructure/controller';
import { PostDITokens } from '/core/post/domain/token/PostDITokens';
import { GetPostUseCaseImpl } from '/core/post/usecase/get-post/impl';
import { PostRepository } from '/core/post/domain/repository/post.repository';
import { GetPostListUseCaseImpl } from '/core/post/usecase/get-post-list/impl';
import { CreatePostUseCaseImpl } from '/core/post/usecase/create-post/impl';
import { MysqlPostRepository } from '/infrastructure/datastore/mysql/post.mysql.repository.impl';
import { CreatePostTransformer } from '/infrastructure/transformer/create-post.transform';
import { GetPostTransformer } from '/infrastructure/transformer/get-post.transform';
import { GetPostListTransformer } from '/infrastructure/transformer/get-post-list.transform';

const repositoryProviders: Provider[] = [
  {
    provide: PostDITokens.PostRepository,
    useClass: MysqlPostRepository,
  },
];

const usecaseProviders: Provider[] = [
  {
    provide: PostDITokens.GetPostUseCase,
    useFactory: (postRepository: PostRepository) =>
      new GetPostUseCaseImpl(postRepository),
    inject: [PostDITokens.PostRepository],
  },
  {
    provide: PostDITokens.GetPostListUseCase,
    useFactory: (postRepository: PostRepository) =>
      new GetPostListUseCaseImpl(postRepository),
    inject: [PostDITokens.PostRepository],
  },
  {
    provide: PostDITokens.CreatePostUseCase,
    useFactory: (postRepository: PostRepository) =>
      new CreatePostUseCaseImpl(postRepository),
    inject: [PostDITokens.PostRepository],
  },
];

const transformerProviders: Provider[] = [
  {
    provide: PostDITokens.GetPostTransformer,
    useClass: GetPostTransformer,
  },
  {
    provide: PostDITokens.GetPostListTransformer,
    useClass: GetPostListTransformer,
  },
  {
    provide: PostDITokens.CreatePostTransformer,
    useClass: CreatePostTransformer,
  },
];

@Module({
  controllers: [PostController],
  providers: [
    ...repositoryProviders,
    ...usecaseProviders,
    ...transformerProviders,
  ],
})
export class PostModule {}
