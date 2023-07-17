import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(post: CreatePostDto, user: User) {
    return this.prismaService.post.create({
      data: {
        title: post.title,
        content: post.content,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        category: true,
      },
    });
  }
  async updatePost(post: UpdatePostDto, id: number) {
    await this.validateRecord(id);
    return await this.prismaService.post.update({
      data: {
        ...post,
      },
      where: {
        id,
      },
    });
  }
  async validateRecord(id) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException('post not found');
    }
    return post;
  }
  async deletePost(id: number) {
    await this.validateRecord(id);
    return await this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
