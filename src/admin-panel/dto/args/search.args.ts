import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArg {
  @Field(() => String)
  @IsOptional()
  @IsString()
  tag?: string[];
}
