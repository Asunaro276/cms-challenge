import { CreatePostInput } from "./dto";

export interface CreatePostUseCase {
  execute(getPostInput: CreatePostInput): Promise<void>;
}
