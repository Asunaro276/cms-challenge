import { PostRepository } from "/core/post/domain/repository/post.repository";
import { GetPostUseCase } from "/core/post/usecase/get-post/interface";
import { GetPostInput, GetPostOutput } from "./dto";

export class GetPostUseCaseImpl implements GetPostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async execute(getPostInput: GetPostInput): Promise<GetPostOutput> {
    const post = await this.postRepository.getById(getPostInput.id);
    return { post };
  }
}
