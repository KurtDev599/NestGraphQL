import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../entities/product.sales.location.entity';

@InputType()
export class ProductSalesLocationInput extends OmitType(
  ProductSalesLocation,
  ['id'],
  InputType,
) {}
