import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Blog } from '../blogs/entities/blog.entity';
import { User } from '../users/entities/user.entity';
import { CommentsService } from './comments.service';
import {
  CreateCommentInput,
  UpdateCommentInput,
  UpdateLikesInput,
} from './dto/inputs';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    const newComment = await this.commentsService.create(
      createCommentInput,
      user,
    );

    const blog = await (newComment.blog as unknown as Promise<Blog>);
    const commentWithBlogId = { ...newComment, blogId: blog.id };

    this.pubSub.publish('commentAdded', { commentAdded: commentWithBlogId });

    return newComment;
  }

  @Subscription(() => Comment, {
    filter: (payload, variables) =>
      payload.commentAdded.blogId === variables.blogId,
  })
  commentAdded(@Args('blogId') blogId: string) {
    return this.pubSub.asyncIterator('commentAdded');
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  removeComment(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.commentsService.remove(id, user);
  }
}
