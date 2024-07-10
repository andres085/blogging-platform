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

  @BeforeInsert()
  sanitizeEmailBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  sanitizeEmailBeforeUpdate() {
    this.sanitizeEmailBeforeInsert();
  }
}
