import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
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

  async findAll(): Promise<Blog[]> {
    return await this.blogsRepository.find();
  }

  async findOne(id: string): Promise<Blog> {
    const foundBlog = await this.blogsRepository.findOneBy({ id });

    if (!foundBlog)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    return foundBlog;
  }

  async update(id: string, updateBlogInput: UpdateBlogInput): Promise<Blog> {
    await this.findOne(id);

    const foundBlog = await this.blogsRepository.preload(updateBlogInput);

    if (!foundBlog)
      throw new NotFoundException(`Blog with id ${id} not found.`);

    return this.blogsRepository.save(foundBlog);
  }

  remove(id: string) {
    return this.update(id, { id, isActive: false });
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.error(error);
    throw new InternalServerErrorException('Error, please check server logs');
  }
}
