import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/createProduct.input';
import { ProductSalesLocation } from '../products-sales-location/entities/product.sales.location.entity';
import { ProductTag } from '../product-tag/entities/product.tag.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationRepository: Repository<ProductSalesLocation>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAllProduct() {
    return await this.productRepository.find({
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
    });
  }

  async findIdProduct({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId, isDeleted: false },
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
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
    const { productSalesLocation, productCategory, productTags, ...product } =
      createProductInput;

    // 상품 거래 위치
    const saveSalesLocation = await this.productSalesLocationRepository.save({
      ...productSalesLocation,
    });

    const saveProductTags = [];
    if (productTags) {
      for (let i = 0; i < productTags.length; i++) {
        const tagName = productTags[i].replace('#', '');

        // 등록된 태그인지 확인
        // TODO: promise.all, for await of 등 성능개선 예정
        const prevTag = await this.productTagRepository.findOne({
          where: { name: tagName },
        });

        if (prevTag) {
          saveProductTags.push(prevTag);
        } else {
          const newTag = await this.productTagRepository.save({
            name: tagName,
          });
          saveProductTags.push(newTag);
        }
      }
    }

    const result = await this.productRepository.save({
      ...product,
      productSalesLocation: saveSalesLocation,
      productCategory: productCategory,
      productTags: saveProductTags,
    });

    return result;
  }

  // TODO: upadte Tag
  // TODO: Create sales location update api
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
