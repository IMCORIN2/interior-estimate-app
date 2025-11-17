import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';

@Entity()
export class EstimateAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  orderIndex: number;

  @ManyToOne(() => EstimateRequest, (req) => req.answers, {
    onDelete: 'CASCADE',
  })
  request: EstimateRequest;
}
