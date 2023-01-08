import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.productCategoryRepository.find();
  }

  async findByIdCategory(categoryId) {
    const result = await this.productCategoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!result) {
      throw new HttpException(
        '존재하지 않는 카테고리입니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return result;
    }
  }

  async createProductCategory(name) {
    const result = await this.productCategoryRepository.save({
      name,
    });
    return result;
  }

  async deleteProductCategory(id) {
    const category = await this.findByIdCategory(id);
    if (category) {
      await this.productCategoryRepository.remove(category);
      return true;
    }
  }
}
