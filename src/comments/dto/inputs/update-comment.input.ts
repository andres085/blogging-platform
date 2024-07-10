import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  @MaxLength(255)
  comment: string;
}
