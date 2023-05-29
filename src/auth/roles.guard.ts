import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from './jwt-auth.guard';
import { ROLES_KEY } from './roles-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private JwtGuard: JwtAuthGuard,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const token: string = this.JwtGuard.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }

      request.user = this.jwtService.verify(token);
      return request.user.roles.some((role) =>
        requiredRoles.includes(role.value),
      );
    } catch (error) {
      throw new HttpException(
        { message: 'Access denied' },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
