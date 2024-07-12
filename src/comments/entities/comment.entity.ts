import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString, IsUUID, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity('comments')
@ObjectType()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Field(() => String)
  @Column()
  @IsString()
  @MaxLength(255)
  comment: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  likes: number = 0;

  @Field(() => Number)
  @Column()
  @IsInt()
  dislikes: number = 0;

  @ManyToOne(() => Blog, (blog) => blog.comments, { lazy: true })
  blog: Blog;

  @ManyToOne(() => User, (user) => user.comments, { lazy: true })
  user: User;
}
