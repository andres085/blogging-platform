import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateLikesInput } from '../comments/dto/inputs';
import { User } from '../users/entities/user.entity';
import { SearchByTagArg } from './dto/args/search.args';
import { CreateBlogInput, UpdateBlogInput } from './dto/inputs';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogInput: CreateBlogInput, user: User): Promise<Blog> {
    try {
      const newBlog = this.blogsRepository.create({ ...createBlogInput, user });
      return await this.blogsRepository.save(newBlog);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(searchByTagArg: SearchByTagArg): Promise<Blog[]> {
    const { tag } = searchByTagArg;

    if (tag) {
      return await this.blogsRepository
        .createQueryBuilder('blogs')
        .where(':tag = ANY (blogs.tags)', { tag })
        .getMany();
    }

    return await this.blogsRepository.find();
  }

  async findAllByUserAndTag(
    userId: string,
    searchByTagArg: SearchByTagArg,
  ): Promise<Blog[]> {
    const { tag } = searchByTagArg;

    if (tag) {
      return await this.blogsRepository
        .createQueryBuilder('blogs')
        .where(':user = userId && :tag = ANY (blogs.tags)', {
          tag,
          user: userId,
        })
        .getMany();
    }

    return await this.blogsRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async findOne(id: string): Promise<Blog> {
    const foundBlog = await this.blogsRepository.findOneBy({ id });

    if (!foundBlog)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    return foundBlog;
  }

  async findOneByUser(id: string, user: User): Promise<Blog> {
    const foundBlog = await this.blogsRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!foundBlog)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    return foundBlog;
  }

  async update(
    id: string,
    updateBlogInput: UpdateBlogInput,
    user: User,
  ): Promise<Blog> {
    await this.findOneByUser(id, user);

    let publishedAt: string | null = null;
    if (updateBlogInput.isActive === true) {
      publishedAt = new Date().toString();
    }

    const foundBlog = await this.blogsRepository.preload({
      ...updateBlogInput,
      publishedAt,
    });

    if (!foundBlog)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    return this.blogsRepository.save(foundBlog);
  }

  async remove(id: string, user: User): Promise<Blog> {
    return this.update(id, { id, isActive: false }, user);
  }

  async modifyLikes(updateLikesInput: UpdateLikesInput): Promise<Blog> {
    const { id: blogId, addLike, addDislike } = updateLikesInput;
    const blogToAddLike = await this.findOne(blogId);

    if (addLike) {
      blogToAddLike.likes++;
    }

    if (addDislike) {
      blogToAddLike.dislikes++;
    }

    return await this.blogsRepository.save(blogToAddLike);
  }

  async blogCountByUserId(userId: string): Promise<number> {
    return await this.blogsRepository.count({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.code !== '500') throw error;

    throw new InternalServerErrorException('Error, please check server logs');
  }
}
