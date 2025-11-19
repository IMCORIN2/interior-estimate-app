import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RequestToCompany } from './requestToCompany.entity';

@Entity()
export class CompanyReply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  message: string;

  @Column({ nullable: true })
  startDate: string;

  @OneToOne(() => RequestToCompany, (rtc) => rtc.reply)
  requestToCompany: RequestToCompany;
}
