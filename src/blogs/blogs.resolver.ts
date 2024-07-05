import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Resolver(() => Blog)
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Mutation(() => Blog, { name: 'createBlog' })
  async createBlog(
    @Args('createBlogInput') createBlogInput: CreateBlogInput,
  ): Promise<Blog> {
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

  @Mutation(() => Blog)
  async updateBlog(
    @Args('updateBlogInput') updateBlogInput: UpdateBlogInput,
  ): Promise<Blog> {
    return this.blogsService.update(updateBlogInput.id, updateBlogInput);
  }

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogsService.remove(id);
  }
}
