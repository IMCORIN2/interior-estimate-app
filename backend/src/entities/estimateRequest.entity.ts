import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Answer } from './answer.entity';
import { RequestToCompany } from './requestToCompany.entity';
import { Question } from './question.entity';

@Entity()
export class EstimateRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Answer, (ans) => ans.request, { cascade: true })
  answers: Answer[];

  @OneToMany(() => RequestToCompany, (rct) => rct.request)
  requestToCompanies: RequestToCompany[];

  @OneToMany(() => Question, (q) => q.estimateRequest, { cascade: true })
  questions: Question[];
}
