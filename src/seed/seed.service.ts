import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/entities/user.entity';
import { BlogsService } from '../blogs/blogs.service';
import { Blog } from '../blogs/entities/blog.entity';
import { BLOGS_DATA, USERS_DATA } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
    private readonly authService: AuthService,
    private readonly blogService: BlogsService,
  ) {}

  async execute(): Promise<boolean> {
    await this.deleteDatabase();

    const user = await this.loadUsers();
    await this.loadBlogs(user);

    return true;
  }

  async deleteDatabase(): Promise<void> {
    await this.blogsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();

    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadUsers(): Promise<User> {
    const usersPromises = [];

    for (const user of USERS_DATA) {
      usersPromises.push(this.authService.create(user));
    }

    await Promise.all(usersPromises);

    const foundUser = await this.usersRepository
      .createQueryBuilder('user')
      .where(':role = ANY (user.roles)', { role: 'author' })
      .getMany();

    return foundUser[0];
  }

  async loadBlogs(user: User): Promise<Blog[]> {
    const blogPromises = [];

    for (const blog of BLOGS_DATA) {
      blogPromises.push(this.blogService.create(blog, user));
    }

    await Promise.all(blogPromises);

    return blogPromises;
  }
}
