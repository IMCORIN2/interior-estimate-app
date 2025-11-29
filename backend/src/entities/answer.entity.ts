import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => EstimateRequest, (req) => req.answers)
  request: EstimateRequest;
}
