import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchFlagsArgs } from '../admin-panel/dto/args/admin-flag-search.args';
import { CreateFlagInput } from './dto/create-flag.input';
import { Flag } from './entities/flag.entity';

@Injectable()
export class FlagsService {
  constructor(
    @InjectRepository(Flag) private readonly flagRepository: Repository<Flag>,
  ) {}

  async create(
    createFlagInput: CreateFlagInput,
    userId: string,
  ): Promise<Flag> {
    const newFlag = this.flagRepository.create({ ...createFlagInput, userId });

    return await this.flagRepository.save(newFlag);
  }

  async findFlags(searchFlagsArgs: SearchFlagsArgs): Promise<Flag[]> {
    const { entityType, status } = searchFlagsArgs;

    const queryBuilder = this.flagRepository.createQueryBuilder('flags');

    if (entityType) {
      queryBuilder.andWhere('"entityType" = :entityType', { entityType });
    }

    if (status) {
      queryBuilder.andWhere('"status" = :status', { status });
    }

    return await queryBuilder.getMany();
  }
}
