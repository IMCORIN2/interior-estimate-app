import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 회원가입
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // 이미 존재하는 이메일인지 확인
    const existUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existUser) {
      throw new Error('이미 존재하는 이메일입니다.');
    }
    // 비밀번호 암호화(hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // User Entity 생성
    const user = this.userRepository.create({
      email: email,
      password: hashedPassword,
    });
    // DB 저장
    return await this.userRepository.save(user);
  }

  // 비밀번호 찾기
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
