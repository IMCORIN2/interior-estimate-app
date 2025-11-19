import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';
import { Company } from './company.entity';
import { CompanyReply } from './companyReply.entity';

@Entity()
export class RequestToCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'replied' | 'rejected';

  @ManyToOne(() => EstimateRequest, (req) => req.requestToCompanies, {
    onDelete: 'CASCADE',
  })
  request: EstimateRequest;

  @ManyToOne(() => Company, (company) => company.requestToCompanies, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @OneToOne(() => CompanyReply, (reply) => reply.requestToCompany)
  reply: CompanyReply;
}
