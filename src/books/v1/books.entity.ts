import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;
}
