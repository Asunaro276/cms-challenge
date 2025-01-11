import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthDITokens } from "/core/auth/domain/token/AuthDITokens";
import { SignInUseCaseImpl } from "/core/auth/usecase/sing-in/impl";
import { User } from "/core/auth/domain/entity/user.entity";
import { SignInTransformer } from "../transformer/sign-in.transform";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthDITokens.SignInUseCase)
    private readonly signInUseCase: SignInUseCaseImpl,

    @Inject(AuthDITokens.SignInTransformer)
    private readonly signInTransformer: SignInTransformer,
  ) {}

  @Post("signin")
  async signIn(@Body() requestBody: User) {
    const signInInput = this.signInTransformer.request(requestBody);
    await this.signInUseCase.execute(signInInput);
  }
}
