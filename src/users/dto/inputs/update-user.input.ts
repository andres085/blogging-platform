import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsString()
  bio?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  avatar?: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  socialLinks?: string[];
}
