export class User {
  email: string;
  password: string;

  constructor(id: string, mailAddress: string, password: string) {
    this.email = mailAddress;
    this.password = password;
  }
}
