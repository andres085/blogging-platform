import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
