import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductSalesLocation } from './entities/product.sales.location.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsSalesLocationService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationRepository: Repository<ProductSalesLocation>,
  ) {}

  async updateSalesLocation({ updateSalesLocation, salesLocationId }) {
    const salesLocation = await this.productSalesLocationRepository.findOne({
      where: { id: salesLocationId },
    });

    if (!salesLocation) {
      throw new HttpException(
        '존재하지 않는 거래 위치입니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newSalesLocation = {
        ...salesLocation,
        id: salesLocationId,
        ...updateSalesLocation,
      };

      return await this.productSalesLocationRepository.save(newSalesLocation);
    }
  }
}
