import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import { UpdateLikesInput } from './dto/inputs';
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

  async findOne(id: string): Promise<Comment> {
    const foundComment = await this.commentsRepository.findOneBy({ id });
    if (!foundComment)
      throw new NotFoundException(`Comment with id: ${id} not fund`);

    return foundComment;
  }

  async modifyLikes(updateLikesInput: UpdateLikesInput): Promise<Comment> {
    const { id: commentId, addLike, addDislike } = updateLikesInput;
    const commentToAddLike = await this.findOne(commentId);

    if (addLike) {
      commentToAddLike.likes++;
    }

    if (addDislike) {
      commentToAddLike.dislikes++;
    }

    return await this.commentsRepository.save(commentToAddLike);
  }

  update(id: string, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
