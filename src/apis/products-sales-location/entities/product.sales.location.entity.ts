import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'PRODUCT_SALES_LOCATION' })
@ObjectType()
export class ProductSalesLocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column({ type: 'decimal' })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal' })
  @Field(() => Float)
  lng: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;

  @CreateDateColumn()
  createDateTime: Date;
}
