import { GetPostInput } from "/post/usecase/get-post/get-post.dto"

export class PostTransformer {
  request(input: Input): GetPostInput {
    const transformedOutput = {
      id: Number(request.id)
    }
    return transformedOutput
  }
  response(): Output {
    
  }
}

export class Input {
  id: string
}

export class Output {
  id: number
}
