import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BlogsService } from './blogs.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Resolver(() => Blog)
@UseGuards(JwtAuthGuard)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Mutation(() => Blog, { name: 'createBlog' })
  async createBlog(
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    console.log({ user });
    return this.blogsService.create(createBlogInput);
  }

  @Query(() => [Blog], { name: 'getAllBlogs' })
  async findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
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
  ): Promise<Blog> {
    return this.blogsService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Blog, { name: 'deactivateBlog' })
  async removeBlog(@Args('id', { type: () => ID }) id: string): Promise<Blog> {
    return this.blogsService.remove(id);
  }
}
