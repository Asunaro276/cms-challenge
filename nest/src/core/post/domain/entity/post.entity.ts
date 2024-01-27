export class Post {
  id: string;
  title: string;
  body: string;

  constructor(id: string, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.body = content;
  }
}

export class NewPost {
  title: string;
  body: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.body = content;
  }
}
