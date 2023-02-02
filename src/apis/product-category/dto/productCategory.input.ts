import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductCategoryInput {
  @Field(() => String)
  id: string;
}
