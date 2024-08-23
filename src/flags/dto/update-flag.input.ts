import { CreateFlagInput } from './create-flag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFlagInput extends PartialType(CreateFlagInput) {
  @Field(() => Int)
  id: number;
}
