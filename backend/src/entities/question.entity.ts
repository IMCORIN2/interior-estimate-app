import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => EstimateRequest, (req) => req.questions)
  estimateRequest: EstimateRequest;
}
