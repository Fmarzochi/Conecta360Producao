import { AsyncLocalStorage } from 'async_hooks';

export const tenantContext = new AsyncLocalStorage<string>();

export const getTenantId = (): string => {
  const tenantId = tenantContext.getStore();
  if (!tenantId) {
    throw new Error('O contexto do tenant não foi encontrado. Certifique-se de que o tenantMiddleware está aplicado.');
  }
  return tenantId;
};
