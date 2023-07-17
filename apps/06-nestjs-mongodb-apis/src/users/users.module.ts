import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './user.schema';
import PostsModule from '../posts/posts.module';
import UsersService from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PostsModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
