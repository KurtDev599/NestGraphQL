import { Module } from '@nestjs/common';
import { ProductsSalesLocationService } from './products-sales-location.service';
import { ProductsSalesLocationResolver } from './products-sales-location.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesLocation } from './entities/product.sales.location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSalesLocation])],
  providers: [ProductsSalesLocationService, ProductsSalesLocationResolver],
})
export class ProductsSalesLocationModule {}
