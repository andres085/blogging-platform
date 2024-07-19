import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';
import { AdminBlogSearchArg } from './dto/args/admin-blog-search.args';
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
}
