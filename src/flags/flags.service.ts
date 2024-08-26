import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchFlagsArgs } from '../admin-panel/dto/args/admin-flag-search.args';
import { UpdateFlagStatusArgs } from '../admin-panel/dto/inputs/update-flag.input';
import { ParsedFlag } from '../admin-panel/dto/responses/flags-response';
import { Blog } from '../blogs/entities/blog.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CreateFlagInput } from './dto/create-flag.input';
import { Flag } from './entities/flag.entity';

@Injectable()
export class FlagsService {
  constructor(
    @InjectRepository(Flag) private readonly flagRepository: Repository<Flag>,
    @InjectRepository(Blog) private readonly blogsRepository: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async create(
    createFlagInput: CreateFlagInput,
    userId: string,
  ): Promise<Flag> {
    const newFlag = this.flagRepository.create({ ...createFlagInput, userId });

    return await this.flagRepository.save(newFlag);
  }

  async findFlags(searchFlagsArgs: SearchFlagsArgs): Promise<ParsedFlag[]> {
    const { entityType, status } = searchFlagsArgs;

    const queryBuilder = this.flagRepository.createQueryBuilder('flags');

    if (entityType) {
      queryBuilder.andWhere('"entityType" = :entityType', { entityType });
    }

    if (status) {
      queryBuilder.andWhere('"status" = :status', { status });
    }

    const foundFlags = await queryBuilder.getMany();

    const parsedFlags: ParsedFlag[] = [];

    for (let flag of foundFlags) {
      let parsedFlag: ParsedFlag = { ...flag };
      if (flag.entityType === 'Comment') {
        parsedFlag.flaggedType = await this.commentsRepository.findOneBy({
          id: flag.entityId,
        });
      }

      if (flag.entityType === 'Blog') {
        parsedFlag.flaggedType = await this.blogsRepository.findOneBy({
          id: flag.entityId,
        });
      }

      parsedFlags.push(parsedFlag);
    }

    return parsedFlags;
  }

  async updateFlagStatus(
    updateFlagStatusArgs: UpdateFlagStatusArgs,
  ): Promise<Flag> {
    const foundFlag = await this.flagRepository.preload(updateFlagStatusArgs);

    if (!foundFlag)
      throw new NotFoundException(
        `Blog with id ${updateFlagStatusArgs.id} not found.`,
      );

    return this.flagRepository.save(foundFlag);
  }
}
