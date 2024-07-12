import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';
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

  async create(
    createCommentInput: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    const { blogId, ...commentData } = createCommentInput;
    const newComment = this.commentsRepository.create({
      ...commentData,
      blog: {
        id: blogId,
      },
      user: {
        id: user.id,
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
      throw new NotFoundException(`Comment with id: ${id} not found.`);

    return foundComment;
  }

  async findOneByUser(id: string, user: User): Promise<Comment> {
    const foundComment = await this.commentsRepository.findOne({
      where: {
        id,
        user: { id: user.id },
      },
    });

    if (!foundComment)
      throw new NotFoundException(`Comment with id ${id} not found.`);

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

  async update(
    id: string,
    updateCommentInput: UpdateCommentInput,
    user: User,
  ): Promise<Comment> {
    await this.findOneByUser(id, user);

    const foundComment =
      await this.commentsRepository.preload(updateCommentInput);

    return this.commentsRepository.save(foundComment);
  }

  async remove(id: string, user: User): Promise<Comment> {
    const commentToDelete = await this.findOneByUser(id, user);

    await this.commentsRepository.delete({ id });

    return commentToDelete;
  }
}
