import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '/core/post/domain/repository/post.repository';
import { NewPost, Post } from '/core/post/domain/entity/post.entity';

const prisma = new PrismaClient();

@Injectable()
export class MysqlPostRepository implements PostRepository {
  async getAll() {
    return await prisma.contents.findMany();
  }

  async getById(id: string) {
    return await prisma.contents.findUnique({ where: { id: id } });
  }

  async create(post: NewPost) {
    console.log(post);
    await prisma.contents.create({
      data: {
        title: post.title,
        body: post.body,
      },
    });
  }

  async update(post: Post) {
    await prisma.contents.update({ where: { id: post.id }, data: post });
  }

  async delete(id: string) {
    await prisma.contents.delete({ where: { id: id } });
  }
}
