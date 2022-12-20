import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int } from '@nestjs/graphql';

@Entity()
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
  @Field(() => Int)
  lat: number;

  @Column({ type: 'decimal' })
  @Field(() => Int)
  lng: number;

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
