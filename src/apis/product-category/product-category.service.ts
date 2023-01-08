import { Injectable } from '@nestjs/common';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async findAllCategory() {
    const result = await this.productCategoryRepository.find();
    return result;
  }

  async createProductCategory({ name }) {
    const result = await this.productCategoryRepository.save({
      name,
    });
    return result;
  }

  async deleteProductCategory({ id }) {
    const category = await this.productCategoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new Error('Category not found!');
    } else {
      await this.productCategoryRepository.remove(category);
    }
    return true;
  }
}
