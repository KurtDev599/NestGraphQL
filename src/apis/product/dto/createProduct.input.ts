import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSalesLocationInput } from '../../products-sales-location/dto/productSalesLocation.input';
import { ProductCategoryInput } from '../../product-category/dto/productCategory.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => ProductSalesLocationInput)
  productSalesLocation: ProductSalesLocationInput;

  @Field(() => ProductCategoryInput)
  productCategory: ProductCategoryInput;

  @Field(() => Int)
  @Min(0)
  price: number;
}
