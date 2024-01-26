import { GetPostListOutput } from './dto';

export interface GetPostListUseCase {
  execute(): Promise<GetPostListOutput>;
}
