import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  content: string | null;
}
