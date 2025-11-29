import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Case } from './entities/case.entity';
import { EstimateRequest } from './entities/estimateRequest.entity';
import { Answer } from './entities/answer.entity';
import { CaseImage } from './entities/caseImage.entity';
import { Company } from './entities/company.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EstimateModule } from './estimate/estimate.module';
import { RequestToCompany } from './entities/requestToCompany.entity';
import { CompanyReply } from './entities/companyReply.entity';
import { Question } from './entities/question.entity';

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
      Answer,
      CaseImage,
      Company,
      RequestToCompany,
      CompanyReply,
      Question,
    ]),

    UsersModule,

    AuthModule,

    EstimateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
