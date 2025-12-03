import { Injectable } from '@nestjs/common';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestToCompany } from 'src/entities/requestToCompany.entity';
import { EstimateRequest } from 'src/entities/estimateRequest.entity';
import { Repository } from 'typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';
import { RequestAnswer } from 'src/entities/requestAnswer.entity';

@Injectable()
export class EstimateService {
  constructor(
    @InjectRepository(EstimateRequest)
    private readonly estimateReqRepo: Repository<EstimateRequest>,

    @InjectRepository(Answer)
    private readonly ansRepo: Repository<Answer>,

    @InjectRepository(Question)
    private readonly queRepo: Repository<Question>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(RequestAnswer)
    private readonly reqAnsRepo: Repository<RequestAnswer>,
  ) {}

  async saveRequest(userId: number, dto: CreateEstimateDto) {
    console.log('서비스', dto);

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('유저없음');
    const request = this.estimateReqRepo.create({
      user,
      requestAnswers: [],
    });
    // for문 밖 임시 저장용 배열
    const requestAnswersTemp = [];

    for (const item of dto.answers) {
      // question 객체 생성
      const questionRef = this.queRepo.create({
        id: item.questionId,
        content: 'TEMP_QUESTION_CONTENT',
      });
      const savedQuestion = await this.queRepo.save(questionRef);
      // answer 객체 생성
      let answerRef = null;
      const answerId = item.answerId;
      if (answerId) {
        answerRef = this.ansRepo.create({
          id: item.answerId,
          content: item.answerContent,
        });
        console.log(answerRef, 'answerRef');
        const savedAnswer = await this.ansRepo.save(answerRef);
      }

      const requestAnswer = this.reqAnsRepo.create({
        question: questionRef,
        answer: answerRef,
        answerContent: item.answerContent,
      });

      requestAnswersTemp.push(requestAnswer);
    }

    request.requestAnswers = requestAnswersTemp;
    console.log('=========', request, '=========');

    const savedRequest = await this.estimateReqRepo.save(request);
    // JSON 반환
    return { success: true, request: savedRequest };
  }
}
