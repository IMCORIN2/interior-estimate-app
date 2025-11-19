import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Case } from './case.entity';
import { RequestToCompany } from './requestToCompany.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  serviceCategories: string;

  @Column()
  description: string;

  @OneToMany(() => Case, (c) => c.company)
  cases: Case[];

  @OneToMany(() => RequestToCompany, (rtc) => rtc.company)
  requestToCompanies: RequestToCompany[];
}
