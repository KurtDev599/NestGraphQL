import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/createProduct.input';
import { ProductSalesLocation } from '../products-sales-location/entities/product.sales.location.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationRepository: Repository<ProductSalesLocation>,
  ) {}

  async findAllProduct() {
    return await this.productRepository.find();
  }

  async findIdProduct({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId, isDeleted: false },
    });

    if (!product) {
      throw new HttpException(
        '존재하지 않는 상품입니다.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return product;
    }
  }

  async createProduct(createProductInput: CreateProductInput) {
    const { productSalesLocation, ...product } = createProductInput;

    const saveSalesLocation = await this.productSalesLocationRepository.save({
      ...productSalesLocation,
    });

    const result = await this.productRepository.save({
      ...product,
      productSalesLocation: saveSalesLocation,
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
    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const proudct = await this.findIdProduct({ productId });
    if (proudct.isSoldOut) {
      throw new HttpException('판매된 상품입니다.', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProduct({ productId }) {
    await this.findIdProduct({ productId });
    const result = await this.productRepository.softDelete({ id: productId });
    if (result) {
      await this.productRepository.update(
        { id: productId },
        { isDeleted: true },
      );
      return result.affected ? true : false;
    }
  }
}
