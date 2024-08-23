import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class SearchBlogByIDArg {
  @Field(() => ID)
  @IsUUID()
  blogId: string;
}
