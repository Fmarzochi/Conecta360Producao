import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './decorators';
import { tenantContext } from './tenant-context';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['tenant_id'] || request.query.tenantId;

    if (!tenantId) {
      throw new BadRequestException(
        'Tenant ID é obrigatório nos headers (tenant_id) ou query param (tenantId)',
      );
    }

    return new Observable((subscriber) => {
      tenantContext.run(tenantId as string, () => {
        next.handle().subscribe(subscriber);
      });
    });
  }
}
