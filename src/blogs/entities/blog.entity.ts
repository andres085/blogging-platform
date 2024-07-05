import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BlogTags } from '../enums/tags.enums';

@Entity({ name: 'blogs' })
@ObjectType()
export class Blog {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('text', {
    unique: true,
  })
  title: string;

  @Field(() => String)
  @Column('text')
  body: string;

  @Field(() => [BlogTags])
  @Column('text', {
    array: true,
  })
  tags: BlogTags[];
}
