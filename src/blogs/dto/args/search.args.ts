import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { BlogTags } from '../../enums/tags.enums';

@ArgsType()
export class SearchByTagArg {
  @Field(() => BlogTags, { nullable: true })
  @IsOptional()
  @IsString()
  tag?: BlogTags;
}
