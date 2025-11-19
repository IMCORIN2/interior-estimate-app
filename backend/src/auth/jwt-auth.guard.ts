import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  // canActivate(context: ExecutionContext) {
  //   console.log('--- [JwtAuthGuard] canActivate 실행됨 ---');
  //   // Passport-jwt의 인증 로직을 수행합니다.
  //   return super.canActivate(context);
  // }
}
