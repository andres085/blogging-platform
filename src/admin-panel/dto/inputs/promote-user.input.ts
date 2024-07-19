import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import { ValidRoles } from '../../../common/enums/valid-roles.enum';

@InputType()
export class PromoteUserInput {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => [ValidRoles])
  @IsArray()
  roles: ValidRoles[];
}
