import { registerEnumType } from '@nestjs/graphql';

export enum BlogTags {
  BACKEND = 'Backend',
  FRONTEND = 'Frontend',
  WEB_DEVELOPMENT = 'Web Development',
  SOFTWARE_ENGINEERING = 'Software Engineering',
  DEVOPS = 'Devops',
  BOOKS = 'Books',
  TUTORIALS = 'Tutorials',
}

registerEnumType(BlogTags, {
  name: 'BlogTags',
  description: 'These are the tags that a blog post can have.',
});
