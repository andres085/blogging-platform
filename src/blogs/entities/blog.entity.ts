import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
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

  @ManyToOne(() => User, (user) => user.blogs, { lazy: true })
  user: User;
}
