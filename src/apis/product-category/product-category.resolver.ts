import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/product-category.entity';
import { ProductCategoryService } from './product-category.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Query(() => [ProductCategory])
  findAllCategory() {
    return this.productCategoryService.findAllCategory();
  }

  @Query(() => ProductCategory)
  findByIdCategory(@Args('categoryId') categoryId: string) {
    return this.productCategoryService.findByIdCategory(categoryId);
  }

  @Mutation(() => ProductCategory)
  createProductCategory(@Args('name') name: string) {
    return this.productCategoryService.createProductCategory(name);
  }

  @Mutation(() => Boolean)
  deleteProductCategory(@Args('id') id: string) {
    return this.productCategoryService.deleteProductCategory(id);
  }
}
