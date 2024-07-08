import { BlogTags } from '../../blogs/enums/tags.enums';

export const USERS_DATA = [
  {
    email: 'alice@example.com',
    password: 'password123',
    fullName: 'Alice Johnson',
    roles: ['author', 'reader'],
  },
  {
    email: 'bob@example.com',
    password: 'securepassword',
    fullName: 'Bob Smith',
    roles: ['reader'],
  },
  {
    email: 'charlie@example.com',
    password: 'adminpass',
    fullName: 'Charlie Brown',
    roles: ['admin', 'author', 'reader'],
  },
];

export const BLOGS_DATA = [
  {
    title: 'Introduction to REST APIs',
    body: '# Introduction to REST APIs\n\nREST APIs are a crucial part of modern web development. They allow different systems to communicate over HTTP.\n\n## Key Concepts\n\n- **Endpoint**: A specific URL where an API can be accessed.\n- **HTTP Methods**: GET, POST, PUT, DELETE, etc.\n- **Status Codes**: Indicate the result of an API request.\n\n```json\n{\n  "message": "Hello, World!"\n}\n```\n\nLearn how to build and consume REST APIs in this post.',
    tags: [BlogTags.BACKEND],
    isActive: true,
  },
  {
    title: 'Understanding Middleware in Express.js',
    body: "# Understanding Middleware in Express.js\n\nMiddleware functions are functions that have access to the request and response objects in Express.js.\n\n## Types of Middleware\n\n- **Application-level**\n- **Router-level**\n- **Error-handling**\n\n```javascript\napp.use((req, res, next) => {\n  console.log('Middleware executed');\n  next();\n});\n```\n\nMiddleware is essential for handling requests and responses in Express.js.",
    tags: [BlogTags.BACKEND],
    isActive: true,
  },
  {
    title: 'Getting Started with React',
    body: '# Getting Started with React\n\nReact is a popular JavaScript library for building user interfaces.\n\n## Key Concepts\n\n- **Components**: The building blocks of a React application.\n- **JSX**: A syntax extension for JavaScript.\n- **State and Props**: Mechanisms for managing data in components.\n\n```jsx\nfunction App() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default App;\n```\n\nThis post covers the basics of creating a React application.',
    tags: [BlogTags.FRONTEND],
    isActive: true,
  },
  {
    title: 'CSS Grid Layout',
    body: '# CSS Grid Layout\n\nCSS Grid Layout is a powerful layout system for creating complex web layouts.\n\n## Key Concepts\n\n- **Grid Container**: The parent element.\n- **Grid Items**: The child elements.\n- **Grid Template Areas**: Define the layout structure.\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}\n```\n\nLearn how to create responsive layouts using CSS Grid.',
    tags: [BlogTags.FRONTEND],
    isActive: false,
  },
  {
    title: 'Introduction to Progressive Web Apps (PWAs)',
    body: "# Introduction to Progressive Web Apps (PWAs)\n\nProgressive Web Apps (PWAs) provide a native app-like experience on the web.\n\n## Key Features\n\n- **Offline Support**\n- **Push Notifications**\n- **Installable**\n\n```javascript\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('/sw.js');\n}\n```\n\nDiscover how to build a PWA in this post.",
    tags: [BlogTags.WEB_DEVELOPMENT],
    isActive: true,
  },
  {
    title: 'Web Accessibility Basics',
    body: '# Web Accessibility Basics\n\nWeb accessibility ensures that websites are usable by people with disabilities.\n\n## Key Principles\n\n- **Perceivable**\n- **Operable**\n- **Understandable**\n- **Robust**\n\n```html\n<img src="image.jpg" alt="Description of image">\n```\n\nLearn how to make your website accessible to everyone.',
    tags: [BlogTags.WEB_DEVELOPMENT],
    isActive: false,
  },
  {
    title: 'Introduction to Design Patterns',
    body: '# Introduction to Design Patterns\n\nDesign patterns are reusable solutions to common software design problems.\n\n## Types of Design Patterns\n\n- **Creational**\n- **Structural**\n- **Behavioral**\n\n```typescript\nclass Singleton {\n  private static instance: Singleton;\n\n  private constructor() {}\n\n  public static getInstance(): Singleton {\n    if (!Singleton.instance) {\n      Singleton.instance = new Singleton();\n    }\n    return Singleton.instance;\n  }\n}\n```\n\nThis post introduces some common design patterns in software engineering.',
    tags: [BlogTags.SOFTWARE_ENGINEERING],
    isActive: true,
  },
  {
    title: 'Understanding SOLID Principles',
    body: '# Understanding SOLID Principles\n\nSOLID principles are a set of guidelines for writing maintainable and scalable code.\n\n## Principles\n\n- **Single Responsibility Principle**\n- **Open/Closed Principle**\n- **Liskov Substitution Principle**\n- **Interface Segregation Principle**\n- **Dependency Inversion Principle**\n\n```typescript\ninterface Shape {\n  area(): number;\n}\n\nclass Circle implements Shape {\n  constructor(private radius: number) {}\n\n  area(): number {\n    return Math.PI * this.radius * this.radius;\n  }\n}\n```\n\nLearn how to apply SOLID principles in your code.',
    tags: [BlogTags.SOFTWARE_ENGINEERING],
    isActive: true,
  },
  {
    title: 'Introduction to Continuous Integration (CI)',
    body: '# Introduction to Continuous Integration (CI)\n\nContinuous Integration (CI) is a practice where developers integrate code into a shared repository frequently.\n\n## Key Concepts\n\n- **Automated Builds**\n- **Automated Testing**\n- **Version Control**\n\n```yaml\nname: CI Pipeline\n\non: [push]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v2\n      - name: Run Tests\n        run: npm test\n```\n\nDiscover how to set up a CI pipeline in this post.',
    tags: [BlogTags.DEVOPS],
    isActive: true,
  },
  {
    title: 'Introduction to Docker',
    body: '# Introduction to Docker\n\nDocker is a platform for developing, shipping, and running applications in containers.\n\n## Key Concepts\n\n- **Containers**\n- **Dockerfile**\n- **Images**\n- **Docker Compose**\n\n```dockerfile\nFROM node:14\n\nWORKDIR /app\n\nCOPY package*.json ./\n\nRUN npm install\n\nCOPY . .\n\nCMD ["node", "index.js"]\n```\n\nLearn how to containerize your applications with Docker.',
    tags: [BlogTags.DEVOPS],
    isActive: true,
  },
  {
    title: 'Book Review: "Clean Code"',
    body: '# Book Review: "Clean Code"\n\n"Clean Code" by Robert C. Martin is a must-read for software developers.\n\n## Key Takeaways\n\n- **Writing Readable Code**\n- **Refactoring Techniques**\n- **Best Practices**\n\n**My Rating: 5/5**\n\nThis book provides valuable insights into writing maintainable and clean code.',
    tags: [BlogTags.BOOKS],
    isActive: true,
  },
  {
    title: 'Building a Todo App with Vue.js',
    body: '# Building a Todo App with Vue.js\n\nIn this tutorial, we\'ll build a simple Todo app using Vue.js.\n\n## Steps\n\n1. Set up the Vue.js project\n2. Create components\n3. Manage state\n4. Add CRUD functionality\n\n```html\n<template>\n  <div>\n    <h1>Todo App</h1>\n    <input v-model="newTodo" @keyup.enter="addTodo">\n    <ul>\n      <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>\n    </ul>\n  </div>\n</template>\n```\n\nFollow along to build your own Todo app with Vue.js.',
    tags: [BlogTags.TUTORIALS],
    isActive: true,
  },
];
