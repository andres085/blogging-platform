import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: ['reader'],
  })
  roles: string[];

  @OneToMany(() => Blog, (blog) => blog.user, { lazy: true })
  blogs: Blog[];

  @OneToMany(() => Blog, (comment) => comment.user, { lazy: true })
  comments: Comment[];

  @Field(() => String, { nullable: true })
  @Column('text', { default: null })
  bio: string;

  @Field(() => String, { nullable: true })
  @Column('text', { default: null })
  avatar: string;

  @Field(() => [String], { nullable: true })
  @Column('text', {
    array: true,
    default: [],
  })
  socialLinks: string[];

  @BeforeInsert()
  sanitizeEmailBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  sanitizeEmailBeforeUpdate() {
    this.sanitizeEmailBeforeInsert();
  }
}
