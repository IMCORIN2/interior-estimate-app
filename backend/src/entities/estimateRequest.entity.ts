import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { EstimateAnswer } from './estimateAnswer.entity';

@Entity()
export class EstimateRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => EstimateAnswer, (ans) => ans.request, { cascade: true })
  answers: EstimateAnswer[];
}
