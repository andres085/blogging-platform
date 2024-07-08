import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsResolver } from './blogs.resolver';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';

@Module({
  providers: [BlogsResolver, BlogsService],
  imports: [TypeOrmModule.forFeature([Blog])],
  exports: [BlogsService, TypeOrmModule],
})
export class BlogsModule {}
