import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import { CreateCommentInput } from './dto/inputs/create-comment.input';
import { UpdateCommentInput } from './dto/inputs/update-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const { blogId, ...commentData } = createCommentInput;
    const newComment = this.commentsRepository.create({
      ...commentData,
      blog: {
        id: blogId,
      },
    });

    return await this.commentsRepository.save(newComment);
  }

  async findAll(blog: Blog): Promise<Comment[]> {
    const queryBuilder = this.commentsRepository
      .createQueryBuilder()
      .where(`"blogId"=:blogId`, { blogId: blog.id });

    return queryBuilder.getMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  update(id: string, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
