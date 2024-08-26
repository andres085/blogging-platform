import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { FlagStatus } from '../../../flags/enums/flag-status.enum';

@InputType()
export class UpdateFlagStatusArgs {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => FlagStatus)
  @IsString()
  status: FlagStatus;
}
