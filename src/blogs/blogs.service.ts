import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
  ) {}

  async create(createBlogInput: CreateBlogInput): Promise<Blog> {
    try {
      const newBlog = this.blogsRepository.create(createBlogInput);
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
      throw new NotFoundException(`Blog with id: ${id} not found.`);

    return foundBlog;
  }

  update(id: number, updateBlogInput: UpdateBlogInput) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.error(error);
    throw new InternalServerErrorException('Error, please check server logs');
  }
}
