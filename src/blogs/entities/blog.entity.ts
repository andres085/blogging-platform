import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';
import { BlogTags } from '../enums/tags.enums';

@Entity({ name: 'blogs' })
@ObjectType()
export class Blog {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => [BlogTags])
  tags: BlogTags[];
}
