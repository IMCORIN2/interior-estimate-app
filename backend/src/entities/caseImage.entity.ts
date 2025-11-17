import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CaseImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
}
