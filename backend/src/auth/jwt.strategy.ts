import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer TOKEN
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}

// PassportStrategy가 하는 일:

// super() 옵션을 passport-jwt Strategy에 전달

// passport-jwt가 전략을 초기화

// HTTP 요청이 들어오면

// 헤더에서 JWT 추출

// 서명(signature) 검증

// 만료시간 체크

// payload 복호화

// 성공하면 validate() 호출하여 payload 리턴

// JWT가 유효하면

// Strategy가 payload를 validate()에 전달

// validate의 return 값이 그대로 req.user가 됨

// req.user = { userId: 1, email: "test@test.com" }
