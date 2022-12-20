import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  emil: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
