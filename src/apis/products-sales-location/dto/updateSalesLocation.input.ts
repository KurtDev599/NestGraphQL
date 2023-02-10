import { InputType, PartialType } from '@nestjs/graphql';
import { ProductSalesLocationInput } from './productSalesLocation.input';

@InputType()
export class updateSalesLocationInput extends PartialType(
  ProductSalesLocationInput,
) {}
