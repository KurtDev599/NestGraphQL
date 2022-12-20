import { Module } from '@nestjs/common';
import { BoardModule } from './apis/board/board.module';
import { ProductModule } from './apis/product/product.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/board/entities/board.entity';
import { ProductsSalesLocationModule } from './apis/products-sales-location/products-sales-location.module';
import { ProductCategoryModule } from './apis/product-category/product-category.module';

@Module({
  imports: [
    BoardModule,
    ProductModule,
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
      entities: [Board],
      synchronize: true,
      logging: true,
    }),
    ProductCategoryModule,
  ],
})
export class AppModule {}
