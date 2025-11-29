import { Injectable } from '@nestjs/common';
import { CreateEstimateDto } from './dto/create-estimate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestToCompany } from 'src/entities/requestToCompany.entity';
import { EstimateRequest } from 'src/entities/estimateRequest.entity';
import { Repository } from 'typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class EstimateService {
  constructor(
    @InjectRepository(EstimateRequest)
    private readonly reqRepo: Repository<EstimateRequest>,

    @InjectRepository(Answer)
    private readonly ansRepo: Repository<Answer>,

    @InjectRepository(Question)
    private readonly queRepo: Repository<Question>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async saveRequest(userId: number, dto: CreateEstimateDto) {
    console.log('서비스', dto);
    const ans = dto.answers;

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('유저없음');
    const request = this.reqRepo.create({
      user,
      questions: [],
      answers: [],
    });

    for (let i = 0; i < ans.length; i++) {
      // question이 존재하지 않는 경우 저장
      let question = await this.queRepo.findOne({
        where: { content: ans[i].question },
      });

      if (!question) {
        question = this.queRepo.create({ content: ans[i].question });
        await this.queRepo.save(question);
      }
      // answer이 존재하지 않는 경우 저장
      let answer = await this.ansRepo.findOne({
        where: {
          content: ans[i].answer,
        },
      });

      if (!answer) {
        answer = this.ansRepo.create({ content: ans[i].answer });
        await this.ansRepo.save(answer);
      }
      // 질문과 답변이 준비되면 request에 추가
      request.questions.push(question);
      request.answers.push(answer);
    }
    // request 저장 (for 문 안에 넣어야하는지 밖에 넣어야 하는지 생각해보기)
    const savedRequest = await this.reqRepo.save(request);
    // JSON 반환
    return { success: true, request: savedRequest };
  }
}
