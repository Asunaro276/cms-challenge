export class PostDITokens {
  public static readonly PostRepository: unique symbol =
    Symbol("PostRepository");

  public static readonly GetPostUseCase: unique symbol =
    Symbol("GetPostUseCase");
  public static readonly GetPostListUseCase: unique symbol =
    Symbol("GetPostListUseCase");
  public static readonly CreatePostUseCase: unique symbol =
    Symbol("CreatePostUseCase");
  public static readonly EditPostUseCase: unique symbol =
    Symbol("EditPostUseCase");
  public static readonly DeletePostUseCase: unique symbol =
    Symbol("DeletePostUseCase");

  public static readonly GetPostTransformer: unique symbol =
    Symbol("GetPostTransformer");
  public static readonly GetPostListTransformer: unique symbol = Symbol(
    "GetPostListTransformer",
  );
  public static readonly CreatePostTransformer: unique symbol = Symbol(
    "CreatePostTransformer",
  );
  public static readonly EditPostTransformer: unique symbol = Symbol(
    "EditPostTransformer",
  );
  public static readonly DeletePostTransformer: unique symbol = Symbol(
    "DeletePostTransformer",
  );
}
