import { registerEnumType } from '@nestjs/graphql';

export enum EntityType {
  BLOG = 'Blog',
  COMMENT = 'Comment',
}

registerEnumType(EntityType, {
  name: 'EntityType',
  description:
    'These are the types of entities to flag, a blog post or a comment.',
});
