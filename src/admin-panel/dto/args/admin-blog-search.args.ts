import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class AdminBlogSearchArg {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tag?: string[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
