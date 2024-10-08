import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from '../comments/comments.service';
import { UpdateLikesInput } from '../comments/dto/inputs';
import { Comment } from '../comments/entities/comment.entity';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { BlogsService } from './blogs.service';
import { SearchByTagArg } from './dto/args/search.args';
import { CreateBlogInput, UpdateBlogInput } from './dto/inputs';
import { Blog } from './entities/blog.entity';

@Resolver(() => Blog)
@UseGuards(JwtAuthGuard)
export class BlogsResolver {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Mutation(() => Blog, { name: 'createBlog' })
  async createBlog(
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    return this.blogsService.create(createBlogInput, user);
  }

  @Query(() => [Blog], { name: 'getAllBlogs' })
  async findAll(@Args() searchByTagArg: SearchByTagArg): Promise<Blog[]> {
    return this.blogsService.findAll(searchByTagArg);
  }

  @Query(() => Blog, { name: 'getBlog' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Blog> {
    return this.blogsService.findOne(id);
  }

  @Mutation(() => Blog, { name: 'updateBlog' })
  async updateBlog(
    @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    return this.blogsService.update(updateBlogInput.id, updateBlogInput, user);
  }

  @Mutation(() => Blog, { name: 'deactivateBlog' })
  async removeBlog(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    return this.blogsService.remove(id, user);
  }

  @ResolveField(() => [Comment], { name: 'comments' })
  async getComments(@Parent() blog: Blog): Promise<Comment[]> {
    return this.commentsService.findAll(blog);
  }

  @Mutation(() => Blog, {
    name: 'modifyBlogLikes',
    description:
      'This mutation is used to modify the like and dislikes for a comment',
  })
  async modifyLikes(
    @Args('updateBlogLikesInput') updateLikesInput: UpdateLikesInput,
  ): Promise<Blog> {
    return this.blogsService.modifyLikes(updateLikesInput);
  }
}
