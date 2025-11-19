import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule), // users <-> auth가 서로 순환해서 참조하기 때문에 둘다 forwardRef() 써줘야함
    TypeOrmModule.forFeature([User]),
  ], // 이걸 넣어야 User Repository가 연결됨
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
