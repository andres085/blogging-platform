import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PromoteUserInput } from './dto/inputs/promote-user.input';

@Injectable()
export class AdminPanelService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async modifyUserRole(promoteUserInput: PromoteUserInput): Promise<User> {
    const { id, roles } = promoteUserInput;
    const userToModifyRole = await this.usersRepository.findOneBy({ id });

    if (!userToModifyRole)
      throw new NotFoundException(`User with id ${id} not found.`);

    const userToUpdate = await this.usersRepository.preload({
      id,
      roles: [...userToModifyRole.roles, ...roles],
    });

    return this.usersRepository.save(userToUpdate);
  }
}
