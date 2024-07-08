import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
  admin = 'admin',
  author = 'author',
  reader = 'reader',
}

registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'These are the valid roles for a user',
});
