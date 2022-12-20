import { Module } from '@nestjs/common';
import { ProductsSalesLocationService } from './products-sales-location.service';
import { ProductsSalesLocationController } from './products-sales-location.controller';

@Module({
  providers: [ProductsSalesLocationService],
  controllers: [ProductsSalesLocationController],
})
export class ProductsSalesLocationModule {}
