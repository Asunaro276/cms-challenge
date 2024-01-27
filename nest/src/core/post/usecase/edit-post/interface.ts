import { EditPostInput } from './dto';

export interface EditPostUseCase {
  execute(getPostInput: EditPostInput): Promise<void>;
}
