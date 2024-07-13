import { SignInInput, SignInOutput } from "./dto";

export interface GetUserUseCase {
  execute(signInInput: SignInInput): Promise<SignInOutput>;
}
