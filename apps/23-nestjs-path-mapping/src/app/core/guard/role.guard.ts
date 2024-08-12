import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export enum Roles {
  'admin' = 'admin',
  'user' = 'user',
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles =
      this.reflector.getAllAndMerge<Roles[]>('roles', [
        context.getClass(),
        context.getHandler(),
      ]) || [];
    if (roles && roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const hasRole = () =>
      user.roles.some(
        (role: string) => !!roles.find((userRole: string) => userRole === role),
      );
    console.log(roles, user.roles);
    return user && user.roles && hasRole();
  }
}
