import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PostRepository } from '/core/post/domain/repository/post.repository';
import { Post } from '/core/post/domain/entity/post.entity';

const prisma = new PrismaClient();

@Injectable()
export class MysqlPostRepository implements PostRepository {
  async getAll() {
    return await prisma.post.findMany();
  }

  async getById(id: number) {
    return await prisma.post.findUnique({ where: { id: id } });
  }

  async create(post: Post) {
    await prisma.post.create({ data: post });
  }

  async update(post: { id: number; title?: string; content?: string }) {
    await prisma.post.update({ where: { id: post.id }, data: post });
  }

  async delete(id: number) {
    await prisma.post.delete({ where: { id: id } });
  }
}
