import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int } from '@nestjs/graphql';
import { ProductSalesLocation } from '../../products-sales-location/entities/productSalesLocation.entity';
import { ProductCategory } from '../../product-category/entities/product-category.entity';
import { User } from '../../users/entities/user.entity';
import { ProductTag } from '../../product-tag/entities/product.tag.entity';
import { JoinTable } from 'typeorm/browser';

@Entity()
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

  @Column()
  @Field(() => Boolean)
  isSoldOut: boolean;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.id)
  productTags: ProductTag[];
}
