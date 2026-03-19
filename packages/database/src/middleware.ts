import { Request, Response, NextFunction } from 'express';
import { tenantContext } from './tenant-context';

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Rotas públicas que não exigem tenant_id
  const publicRoutes = ['/health'];
  
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const tenantId = req.headers['tenant_id'] || req.query.tenantId;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID é obrigatório nos headers (tenant_id) ou query param (tenantId)' });
  }

  tenantContext.run(tenantId as string, () => {
    next();
  });
};
