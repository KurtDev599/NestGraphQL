import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSalesLocation } from '../products-sales-location/entities/product.sales.location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSalesLocation])],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
