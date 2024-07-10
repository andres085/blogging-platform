import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import {
  CreateCommentInput,
  UpdateCommentInput,
  UpdateLikesInput,
} from './dto/inputs';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
@UseGuards(JwtAuthGuard)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return this.commentsService.create(createCommentInput, user);
  }

  @Mutation(() => Comment, {
    name: 'modifyLikes',
    description:
      'This mutation is used to modify the like and dislikes for a comment',
  })
  async modifyLikes(
    @Args('updateCommentInput') updateLikesInput: UpdateLikesInput,
  ): Promise<Comment> {
    return this.commentsService.modifyLikes(updateLikesInput);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
      user,
    );
  }

  @Mutation(() => Comment)
  removeComment(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.remove(id, user);
  }
}
