import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'USER' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  emil: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column()
  @Field(() => Number)
  age: number;
}
