import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProfileModule } from './modules/profile/profile.module.js';
import { UUIDResolver, DateResolver } from 'graphql-scalars';
@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./src/graphql/**/*'],
      resolvers: {
        UUID: UUIDResolver,
        Date: DateResolver,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    ProfileModule,
  ],
  providers: [],
})
export class AppModule {}
