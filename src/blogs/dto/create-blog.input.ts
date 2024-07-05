import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import { BlogTags } from '../enums/tags.enums';

@InputType()
export class CreateBlogInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  body: string;

  @Field(() => [BlogTags])
  @IsArray()
  tags: BlogTags[];
}
