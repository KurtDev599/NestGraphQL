import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
PickType(CreateProductInput, ['name', 'price', 'productCategory']);
OmitType(CreateProductInput, ['description']);
