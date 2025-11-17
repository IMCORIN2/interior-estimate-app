import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Case } from './entities/case.entity';
import { EstimateRequest } from './entities/estimateRequest.entity';
import { EstimateAnswer } from './entities/estimateAnswer.entity';
import { CaseImage } from './entities/caseImage.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // entity 자동 로딩
      synchronize: true, // 개발환경에서만 true (자동 테이블 생성)
    }),

    TypeOrmModule.forFeature([
      User,
      Case,
      EstimateRequest,
      EstimateAnswer,
      CaseImage,
      Company,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
