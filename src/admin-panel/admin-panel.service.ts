import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';
import { AdminBlogSearchArg } from './dto/args/admin-blog-search.args';
import { FeatureBlogInput } from './dto/inputs/feature-blog.input';
import { PromoteUserInput } from './dto/inputs/promote-user.input';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
  ) {}

  async findAllBlogs(searchArgs: AdminBlogSearchArg): Promise<Blog[]> {
    const { tag, isActive } = searchArgs;

    const queryBuilder = this.blogsRepository.createQueryBuilder('blogs');

    if (tag) {
      queryBuilder.andWhere(':tag = ANY (blogs.tags)', { tag });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('"isActive" = :isActive', { isActive });
    }

    return await queryBuilder.getMany();
  }

  async deactivateBlog(id: string): Promise<Blog> {
    const blogToDeactivate = await this.blogsRepository.findOneBy({ id });

    if (!blogToDeactivate)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    if (!blogToDeactivate.isActive)
      throw new NotFoundException(`Blog with id ${id} is already inactive.`);

    const foundBlog = await this.blogsRepository.preload({
      id,
      isActive: false,
      publishedAt: null,
    });

    return this.blogsRepository.save(foundBlog);
  }

  async modifyUserRoles(promoteUserInput: PromoteUserInput): Promise<User> {
    const { id, roles } = promoteUserInput;
    const userToModifyRole = await this.usersRepository.findOneBy({ id });

    if (!userToModifyRole)
      throw new NotFoundException(`User with id ${id} not found.`);

    const userToUpdate = await this.usersRepository.preload({
      id,
      roles,
    });

    return this.usersRepository.save(userToUpdate);
  }

  async deleteBlog(id: string): Promise<Blog> {
    const blogToDeactivate = await this.blogsRepository.findOneBy({ id });

    if (!blogToDeactivate)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    await this.blogsRepository.delete(id);

    return blogToDeactivate;
  }

  async changeFeatureBlog(featureBlog: FeatureBlogInput): Promise<Blog> {
    const { id, isFeatured } = featureBlog;

    const blogToUpdate = await this.blogsRepository.findOneBy({ id });

    if (!blogToUpdate)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    const foundBlog = await this.blogsRepository.preload({
      id,
      isFeatured,
    });

    await this.blogsRepository.save(foundBlog);

    return foundBlog;
  }
}
