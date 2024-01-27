import { Injectable } from '@nestjs/common';
import { DeletePostInput } from '/core/post/usecase/delete-post/dto';

@Injectable()
export class DeletePostTransformer {
  request(input: RequestInput): DeletePostInput {
    return input;
  }
}

export class RequestInput {
  id: string;
}
