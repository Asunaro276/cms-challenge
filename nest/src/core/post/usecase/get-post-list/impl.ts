import { PostRepository } from "/core/post/domain/repository/post.repository";
import { GetPostListOutput } from "./dto";
import { GetPostListUseCase } from "./interface";

export class GetPostListUseCaseImpl implements GetPostListUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute(): Promise<GetPostListOutput> {
    const posts = await this.postRepository.getAll();
    return { posts };
  }
}
