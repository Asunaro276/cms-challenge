import { Module } from "@nestjs/common";
import { PostController } from "./infrastructure/controller";
import { GetPostUseCaseImpl } from "./usecase/get-post/impl";

@Module({
  controllers: [PostController],
  providers: [GetPostUseCaseImpl]
})
export class PostModule {}
