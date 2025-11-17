import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  style: string;

  @Column()
  size: string;

  @Column()
  location: string;

  @ManyToOne(() => Company, (company) => company.cases, { onDelete: 'CASCADE' })
  company: Company;
}
