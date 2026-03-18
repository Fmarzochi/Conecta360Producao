import { Request, Response, NextFunction } from 'express';
import { tenantContext } from './tenant-context';

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.headers['tenant_id'] || req.query.tenantId;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID é obrigatório nos headers (tenant_id) ou query param (tenantId)' });
  }

  tenantContext.run(tenantId as string, () => {
    next();
  });
};
