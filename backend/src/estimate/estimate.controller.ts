import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { EstimateService } from './estimate.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEstimateDto } from './dto/create-estimate.dto';

@Controller('estimate')
export class EstimateController {
  constructor(private readonly estimateService: EstimateService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async saveRequest(@Req() req, @Body() dto: CreateEstimateDto) {
    await this.estimateService.saveRequest(req.user.userId, dto);
  }
}
