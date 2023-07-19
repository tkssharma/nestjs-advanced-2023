import { Injectable, Inject } from '@nestjs/common';

import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { POST_REPOSITORY } from '../../core/constants';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async create(post: PostDto, userId): Promise<Post> {
    return this.postModel.create<Post>({ ...post, userId });
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.findAll<Post>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Post> {
    return await this.postModel.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.postModel.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] = await this.postModel.update(
      { ...data },
      { where: { id, userId }, returning: true },
    );
    return { numberOfAffectedRows, updatedPost };
  }
}
