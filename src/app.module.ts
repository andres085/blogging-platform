import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { CommentsModule } from './comments/comments.module';
import { CommonModule } from './common/common.module';
import { MyContext } from './common/types/context.type';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        driver: ApolloDriver,
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: MyContext) => {
              const { connectionParams, extra } = context;

              if (connectionParams.Authorization) {
                const authToken = connectionParams.Authorization;

                try {
                  const jwtService = new JwtService({
                    secret: configService.get('JWT_SECRET'),
                  });

                  const payload = jwtService.verify(
                    authToken.replace('Bearer ', ''),
                  );

                  extra.user = payload;
                } catch (err) {
                  throw new Error('Invalid token');
                }
              } else {
                throw new Error('Missing auth token!');
              }
            },
            context: ({ req, extra }: { req?: any; extra?: any }) => {
              if (req) {
                return { headers: req.headers };
              } else if (extra) {
                return { user: extra.user };
              }
            },
          },
        },
      }),
    }),
    AuthModule,
    BlogsModule,
    SeedModule,
    CommentsModule,
    CommonModule,
    UsersModule,
    AdminPanelModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class AppModule {
  static readonly pubSub = new PubSub();
}
