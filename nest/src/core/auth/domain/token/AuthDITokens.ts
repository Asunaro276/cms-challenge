export class AuthDITokens {
  public static readonly AuthRepository: unique symbol =
    Symbol("AuthRepository");

  public static readonly SignInUseCase: unique symbol = Symbol("SignInUseCase");
  public static readonly SignUpUseCase: unique symbol = Symbol("SignUpUseCase");

  public static readonly SignInTransformer: unique symbol =
    Symbol("SignInTransformer");
  public static readonly SignUpTransformer: unique symbol =
    Symbol("SignUpTransformer");
}
