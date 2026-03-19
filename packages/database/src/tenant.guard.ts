import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators';
import { tenantContext } from './tenant-context';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['tenant_id'] || request.query.tenantId;

    if (!tenantId) {
      throw new BadRequestException('Tenant ID é obrigatório nos headers (tenant_id) ou query param (tenantId)');
    }

    tenantContext.enterWith(tenantId as string);

    return true;
  }
}
