import { Module, Provider } from "@nestjs/common";
import { AuthDITokens } from "/core/auth/domain/token/AuthDITokens";
import { SignInUseCaseImpl } from "/core/auth/usecase/sing-in/impl";
import { CognitoAuthRepository } from "../infrastructure/datastore/aws/cognito.auth.repository.impl";
import { AuthRepository } from "/core/auth/domain/repository/auth.repository";
import { AuthController } from "/infrastructure/controller/auth-controller";
import { SignInTransformer } from "/infrastructure/transformer/sign-in.transform";

const repositoryProviders: Provider[] = [
  {
    provide: AuthDITokens.AuthRepository,
    useClass: CognitoAuthRepository
  }
]

const usecaseProviders: Provider[] = [
  {
    provide: AuthDITokens.SignInUseCase,
    useFactory: (authRepository: AuthRepository) =>
      new SignInUseCaseImpl(authRepository),
    inject: [AuthDITokens.AuthRepository],
  },
]

const transformerProviders: Provider[] = [
  {
    provide: AuthDITokens.SignInTransformer,
    useClass: SignInTransformer
  }
]

@Module({
  controllers: [AuthController],
  providers: [
    ...repositoryProviders,
    ...usecaseProviders,
    ...transformerProviders
  ],
})
export class AuthModule {}
