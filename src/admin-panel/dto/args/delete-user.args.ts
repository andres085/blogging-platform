import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class DeleteUserArg {
  @Field(() => String)
  @IsString()
  id: string;
}
