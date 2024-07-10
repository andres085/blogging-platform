import { Field, ID, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class UpdateLikesInput {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  addLike?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  addDislike?: boolean;
}
