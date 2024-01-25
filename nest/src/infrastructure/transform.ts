import { GetPostInput, GetPostOutput } from "/core/post/usecase/get-post/dto"

export class PostTransformer {
  request(input: Input): GetPostInput {
    const transformedOutput = {
      id: Number(input.id)
    }
    return transformedOutput
  }
  response(input: GetPostOutput): Result {
    return
  }
}

export class Input {
  id: string
}

export class Result {
  id: number
}
