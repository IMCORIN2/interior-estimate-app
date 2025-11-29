import { Module } from '@nestjs/common';
import { EstimateController } from './estimate.controller';
import { EstimateService } from './estimate.service';
import { EstimateRequest } from 'src/entities/estimateRequest.entity';
import { Answer } from 'src/entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Question } from 'src/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstimateRequest, Answer, Question, User]),
  ],
  controllers: [EstimateController],
  providers: [EstimateService],
})
export class EstimateModule {}
