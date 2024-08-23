import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';
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

  @Field(() => Boolean)
  @Column('bool', {
    default: false,
  })
  isActive: boolean;

  @Field(() => [BlogTags])
  @Column('text', {
    array: true,
  })
  tags: BlogTags[];

  @Field(() => Number)
  @Column('int', {
    default: 0,
  })
  @IsInt()
  likes: number = 0;

  @Field(() => Number)
  @Column('int', {
    default: 0,
  })
  @IsInt()
  dislikes: number = 0;

  @Field(() => String)
  @Column('text', {
    default: null,
  })
  publishedAt: string;

  @ManyToOne(() => User, (user) => user.blogs, { lazy: true })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.blog, { lazy: true })
  comments: Comment[];
}
