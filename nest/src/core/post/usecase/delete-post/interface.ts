import { DeletePostInput } from "./dto";

export interface DeletePostUseCase {
  execute(getPostInput: DeletePostInput): Promise<void>;
}
