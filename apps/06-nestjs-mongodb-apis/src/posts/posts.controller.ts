import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import PostsService from './posts.service';
import ParamsWithId from '../utils/paramsWithId';
import PostDto from './dto/post.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Post as PostModel } from './post.schema';
import { PaginationParams } from '../utils/paginationParams';
import UpdatePostDto from './dto/updatePost.dto';

@Controller('posts')
@UseInterceptors(MongooseClassSerializerInterceptor(PostModel))
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query() { skip, limit, startId }: PaginationParams,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.findAll(skip, limit, startId, searchQuery);
  }

  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: PostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(post, req.user);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.postsService.delete(id);
  }

  @Put(':id')
  async updatePost(@Param() { id }: ParamsWithId, @Body() post: UpdatePostDto) {
    return this.postsService.update(id, post);
  }
}
