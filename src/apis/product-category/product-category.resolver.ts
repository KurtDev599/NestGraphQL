import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  @Mutation(() => ProductCategory)
  createProductCategory(@Args('name') name: string) {
    return this.productCategoryService.createProductCategory({ name });
  }

  @Mutation(() => Boolean)
  deleteProductCategory(@Args('id') id: string) {
    return this.productCategoryService.deleteProductCategory({ id });
  }
}
