import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductSalesLocation } from './entities/product.sales.location.entity';
import { ProductsSalesLocationService } from './products-sales-location.service';
import { updateSalesLocationInput } from './dto/updateSalesLocation.input';

@Resolver()
export class ProductsSalesLocationResolver {
  constructor(private productSalesLocation: ProductsSalesLocationService) {}

  @Mutation(() => ProductSalesLocation)
  updateSalesLocation(
    @Args('updateSalesLocation') updateSalesLocation: updateSalesLocationInput,
    @Args('salesLocationId') salesLocationId: string,
  ) {
    return this.productSalesLocation.updateSalesLocation({
      updateSalesLocation,
      salesLocationId,
    });
  }
}
