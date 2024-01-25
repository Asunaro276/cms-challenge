import { GetPostInput, GetPostOutput } from './dto';

export interface GetPostUseCase {
  execute(getPostInput: GetPostInput): Promise<GetPostOutput>;
}
