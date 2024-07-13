import { User } from "../entity/user.entity";

export interface AuthRepository {
  signIn(user: User);
}
