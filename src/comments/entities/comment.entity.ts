import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString, IsUUID, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
@ObjectType()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Field(() => String)
  @Column()
  @IsString()
  @MaxLength(255)
  comment: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  likes: number = 0;

  @Field(() => Number)
  @Column()
  @IsInt()
  dislikes: number = 0;
}
