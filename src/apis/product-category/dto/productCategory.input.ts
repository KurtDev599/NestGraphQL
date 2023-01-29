import { Field, InputType, PickType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class ProductCategoryInput {
  @Field(() => String)
  id: string;
}
