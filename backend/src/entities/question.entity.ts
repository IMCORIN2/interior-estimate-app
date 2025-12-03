import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryColumn()
  id: number;

  @Column('text', { nullable: true })
  content: string | null;
}
