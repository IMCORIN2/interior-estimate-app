import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector : 런타임 시에 메타데이터를 가져올 수 있게 하는 구현체
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // getHandler가 컨텍스트에 있는 roles를 읽어옴.
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    // 위의 코드는 메소드 핸들러 레벨에서만 메타데이터를 읽고 있는데
    // 아래의 코드로 하면 클래스 레벨과 메소드 핸들러 레벨에 모두 @Roles() 데코레이터가 붙어 있을 때
    // 핸들러 레벨의 설정이 클래스 레벨의 설정을 덮어쓰도록 처리할 수 있음
    // 즉 => 클래스 레벨과 핸들러 레벨 모두에서 메타데이터를 읽고 핸들러 레벨이 우선하도록 한다.
    // const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
    //   context.getHandler(), // 1순위: 메소드 레벨
    //   context.getClass(),   // 2순위: 클래스 레벨
    // ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const currentUser = request.user as User;

    const hasRequiredRoles = requiredRoles.some((requiredRoles) =>
      currentUser.roles.some((userRole) => userRole.name === requiredRoles),
    );

    return hasRequiredRoles;
  }
}
