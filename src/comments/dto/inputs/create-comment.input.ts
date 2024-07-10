import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  @IsUUID()
  blogId: string;

  @Field(() => String)
  @IsString()
  @MaxLength(255)
  comment: string;
}
