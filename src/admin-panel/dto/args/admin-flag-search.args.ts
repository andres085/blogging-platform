import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { EntityType } from '../../../flags/enums/entity-type.enum';
import { FlagStatus } from '../../../flags/enums/flag-status.enum';

@ArgsType()
export class SearchFlagsArgs {
  @Field(() => EntityType, { nullable: true })
  @IsOptional()
  @IsString()
  entityType?: EntityType;

  @Field(() => FlagStatus, { nullable: true })
  @IsOptional()
  @IsString()
  status: FlagStatus;
}
