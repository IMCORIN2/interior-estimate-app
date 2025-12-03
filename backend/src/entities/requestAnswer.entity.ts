import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Entity()
export class RequestAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EstimateRequest, (req) => req.requestAnswers, {
    onDelete: 'CASCADE',
  })
  request: EstimateRequest;

  @ManyToOne(() => Question)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  @ManyToOne(() => Answer, { nullable: true })
  @JoinColumn({ name: 'answerId' })
  answer: Answer | null;

  @Column('text')
  answerContent: string;
}
