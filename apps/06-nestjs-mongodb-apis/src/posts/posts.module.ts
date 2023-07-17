import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { Post, PostSchema } from './post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
class PostsModule {}

export default PostsModule;
