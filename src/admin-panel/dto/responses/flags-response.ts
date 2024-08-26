import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql';
import { Blog } from '../../../blogs/entities/blog.entity';
import { Comment } from '../../../comments/entities/comment.entity';

export const FlaggedUnionType = createUnionType({
  name: 'FlaggedUnion',
  types: () => [Blog, Comment] as const,
});

@ObjectType()
export class ParsedFlag {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  entityType: string;
  @Field(() => String)
  entityId: string;
  @Field(() => String)
  userId: string;
  @Field(() => FlaggedUnionType, { nullable: true })
  flaggedType?: Blog | Comment;
  @Field(() => String)
  reason: string;
  @Field(() => String)
  timeStamp: string;
  @Field(() => String)
  status: string;
}
