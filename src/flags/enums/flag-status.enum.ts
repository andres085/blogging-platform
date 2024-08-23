import { registerEnumType } from '@nestjs/graphql';

export enum FlagStatus {
  PENDING = 'Pending',
  REVIEWED = 'Reviewed',
  DISMISSED = 'Dismissed',
}

registerEnumType(FlagStatus, {
  name: 'FlagStatus',
  description:
    'These are the status of a flag that a blog post or a comment can have.',
});
