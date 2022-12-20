import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'PRODUCT_CATEGORY' })
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
