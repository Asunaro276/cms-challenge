import { Module, Provider } from "@nestjs/common"
import { PostDITokens } from "/core/post/domain/token/PostDITokens"
import { GetPostUseCaseImpl } from "/core/post/usecase/get-post/impl"
import { MysqlPostRepository } from "/infrastructure/datastore/mysql/post.mysql.repository.impl"
import { PostController } from "/infrastructure/controller"
import { PostRepository } from "/core/post/domain/repository/post.repository"
import { PostTransformer } from "/infrastructure/transform"

const repositoryProviders: Provider[] = [
  {
    provide: PostDITokens.PostRepository,
    useClass: MysqlPostRepository
  }
]

const usecaseProviders: Provider[] = [
  {
    provide: PostDITokens.GetPostUseCase,
    useFactory: (postRepository: PostRepository) => new GetPostUseCaseImpl(postRepository),
    inject: [PostDITokens.PostRepository]
  }
]

const transformerProviders: Provider[] = [
  {
    provide: PostDITokens.PostTransformer,
    useClass: PostTransformer
  }
]

@Module({
  controllers: [
    PostController
  ],
  providers: [
    ...repositoryProviders,
    ...usecaseProviders,
    ...transformerProviders,
  ]
})
export class PostModule {}
