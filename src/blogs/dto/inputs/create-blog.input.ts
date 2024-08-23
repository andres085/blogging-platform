import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { BlogTags } from '../../enums/tags.enums';

@InputType()
export class CreateBlogInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  body: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isActive: boolean;

  @Field(() => [BlogTags])
  @IsArray()
  tags: BlogTags[];
}
