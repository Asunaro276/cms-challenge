import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '/core/post/domain/repository/post.repository';
import { Post } from '/core/post/domain/entity/post.entity';

const prisma = new PrismaClient();

@Injectable()
export class MysqlPostRepository implements PostRepository {
  async getAll() {
    return await prisma.contents.findMany();
  }

  async getById(id: number) {
    return await prisma.contents.findUnique({ where: { id: id } });
  }

  async create(post: Post) {
    await prisma.contents.create({ data: post });
  }

  async update(post: { id: number; title?: string; content?: string }) {
    await prisma.contents.update({ where: { id: post.id }, data: post });
  }

  async delete(id: number) {
    await prisma.contents.delete({ where: { id: id } });
  }
}
