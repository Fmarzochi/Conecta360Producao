import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/**
 * Decorator para marcar rotas como públicas, ignorando a verificação de tenant_id.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
