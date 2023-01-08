import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSalesLocation } from '../../products-sales-location/entities/product.sales.location.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { User } from '../../users/entities/user.entity';
import { ProductTag } from '../../product-tag/entities/product.tag.entity';

@Entity({ name: 'PRODUCT' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldOut: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  @Field(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable({
    name: 'PRODUCT_PRODUCT_TAG',
    joinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productTagId',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => ProductTag, (productTags) => productTags.id)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
