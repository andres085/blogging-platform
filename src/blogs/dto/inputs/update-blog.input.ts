import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateBlogInput } from './create-blog.input';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
