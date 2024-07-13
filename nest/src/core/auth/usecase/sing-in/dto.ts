import { User } from "../../domain/entity/user.entity";

export interface SignInInput {
  user: User;
}

export interface SignInOutput {
  user: User;
}
