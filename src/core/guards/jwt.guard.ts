import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Role, ROLES_KEY } from '../decorators/roles.decorator';

import * as bcrypt from 'bcrypt';

import { IRequestUser } from '../interfaces/user-request.interface';
import { User } from 'src/app/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('SECRET') || 'somesecretkey'
    });
  }

  async validate(payload: IRequestUser) {
    const user = await User.findOneBy({ id: payload.id });

    if (user && bcrypt.compareSync(payload.session, user.tokenSafety)) {
      return payload;
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext): TUser {
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (requiredRoles) {
      const fulfilled = requiredRoles.some((role) => user.role === role);
      if (fulfilled === false) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }

    return user;
  }
}
