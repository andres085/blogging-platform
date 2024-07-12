import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [TypeOrmModule.forFeature([Comment]), CommonModule],
  exports: [TypeOrmModule, CommentsService],
})
export class CommentsModule {}
