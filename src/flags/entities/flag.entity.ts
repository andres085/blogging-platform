import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityType } from '../enums/entity-type.enum';
import { FlagStatus } from '../enums/flag-status.enum';

@ObjectType()
@Entity('flags')
export class Flag {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => EntityType)
  @Column('text')
  entityType: EntityType;

  @Field(() => ID)
  @Column('uuid')
  entityId: string;

  @Field(() => ID)
  @Column('text')
  userId: string;

  @Field(() => String)
  @Column('text')
  reason: string;

  @Field(() => String)
  @Column('text', {
    default: new Date().toString(),
  })
  timeStamp: string;

  @Field(() => FlagStatus)
  @Column('text', {
    default: FlagStatus.PENDING,
  })
  status: FlagStatus;
}
