import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    try {
      const newUser = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, +process.env.SALT_ROUNDS),
      });

      await this.userRepository.save(newUser);

      delete newUser.password;

      return {
        ...newUser,
        token: this.getJwt({ email: newUser.email }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials.');

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      return {
        ...user,
        token: this.getJwt({ email }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Error, please check server logs');
  }
}
