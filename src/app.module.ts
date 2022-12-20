import { Module } from '@nestjs/common';
import { BoardModule } from './apis/board/board.module';
import { ProductModule } from './apis/product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsSalesLocationModule } from './apis/products-sales-location/products-sales-location.module';
import { ProductCategoryModule } from './apis/product-category/product-category.module';
import { ProductTagModule } from './apis/product-tag/product-tag.module';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    BoardModule,
    ProductModule,
    ProductCategoryModule,
    ProductTagModule,
    UsersModule,
    ProductsSalesLocationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'aa276808!',
      database: 'graphql',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
