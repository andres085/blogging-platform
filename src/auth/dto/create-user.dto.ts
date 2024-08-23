import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AreValidRoles } from '../decorators/register-valid-roles.decorator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3, { message: 'Password must be greater than 3 characters.' })
  @MaxLength(10, { message: 'Password must be less than 10 characters.' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  fullName: string;

  @IsArray()
  @IsNotEmpty()
  @AreValidRoles()
  roles: string[];
}
