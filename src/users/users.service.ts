import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser)
      throw new NotFoundException(`User with id ${id} not found.`);

    return foundUser;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    await this.findOne(id);

    const foundUser = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });

    if (!foundUser)
      throw new NotFoundException(`User with id ${id} not found.`);

    return this.userRepository.save(foundUser);
  }

  async remove(id: string): Promise<User> {
    return await this.update(id, { isActive: false });
  }
}
