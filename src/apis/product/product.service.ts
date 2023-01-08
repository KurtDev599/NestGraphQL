import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/createProduct.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAllProduct() {
    return await this.productRepository.find();
  }

  async findIdProduct({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new HttpException(
        '존재하지 않는 카테고리입니다.',
        HttpStatus.CONFLICT,
      );
    } else {
      return product;
    }
  }

  async createProduct(createProductInput: CreateProductInput) {
    const result = await this.productRepository.save({
      ...createProductInput,
    });

    return result;
  }

  async updateProduct({ productId, updateProductInput }) {
    const product = await this.findIdProduct({ productId });

    const newProduct = {
      ...product,
      id: productId,
      ...updateProductInput,
    };

    if (!product) {
      throw new HttpException(
        '존재하지 않는 카테고리입니다.',
        HttpStatus.CONFLICT,
      );
    } else {
      return await this.productRepository.save(newProduct);
    }
  }

  async checkSoldout({ productId }) {
    const proudct = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (proudct.isSoldOut) {
      throw new HttpException(
        '판매된 상품입니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
