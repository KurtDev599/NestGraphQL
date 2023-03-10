import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSalesLocation } from '../products-sales-location/entities/product.sales.location.entity';
import { ProductTag } from '../product-tag/entities/product.tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSalesLocation, ProductTag]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
