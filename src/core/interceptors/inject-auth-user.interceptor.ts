import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.entity';

@Injectable()
export class InjectAuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      User.findOneBy({ email: user.email }).then((auth) => {
        request.auth = auth;
      });
    }

    return next.handle();
  }
}
