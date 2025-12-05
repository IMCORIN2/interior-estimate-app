import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstimateRequest } from './estimateRequest.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EstimateRequest, (req) => req.user)
  requests: EstimateRequest[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles', // 생성될 중간 테이블의 이름 지정
    joinColumn: {
      name: 'userId', // User 테이블에서 중간 테이블로 연결하는 컬럼 이름
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roleId', // Role 테이블에서 중간 테이블로 연결하는 컬럼 이름
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
