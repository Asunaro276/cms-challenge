import { Injectable } from "@nestjs/common";
import { User } from "/core/auth/domain/entity/user.entity";
import { SignInInput } from "/core/auth/usecase/sing-in/dto";

@Injectable()
export class SignInTransformer {
  request(input: User): SignInInput {
    return { user: input };
  }
}
