import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import {
  CreateCommentInput,
  UpdateCommentInput,
  UpdateLikesInput,
} from './dto/inputs';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentsService.create(createCommentInput);
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

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.remove(id);
  }
}
