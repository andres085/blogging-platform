import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
  exports: [TypeOrmModule, CommentsService],
})
export class CommentsModule {}
