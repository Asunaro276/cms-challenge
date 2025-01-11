import { AuthRepository } from "../../domain/repository/auth.repository";
import { SignInInput, SignInOutput } from "./dto";
import { GetUserUseCase } from "./interface";

export class SignInUseCaseImpl implements GetUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}
  async execute(signInInput: SignInInput): Promise<SignInOutput> {
    const user = await this.authRepository.signIn(signInInput.user);
    return { user };
  }
}
