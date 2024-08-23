import { Field, ID, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { EntityType } from '../enums/entity-type.enum';

@InputType()
export class CreateFlagInput {
  @Field(() => EntityType)
  @IsString()
  entityType: EntityType;

  @Field(() => ID)
  @IsString()
  entityId: string;

  @Field(() => String)
  @IsString()
  reason: string;
}
