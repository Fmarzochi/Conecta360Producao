import { PrismaClient } from '@prisma/client';
import { getTenantId, tenantContext } from './tenant-context';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Define uma extensão que força o tenantId
export const tenantPrisma = prisma.$extends({
  name: 'multi-tenant',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const tenantId = getTenantId();

        // Exclui operações que não recebem um 'where' ou 'data' padrão ou que ignoram o tenantId
        const anyArgs = args as any;
        if (['findUnique', 'findMany', 'findFirst', 'update', 'updateMany', 'delete', 'deleteMany'].includes(operation)) {
          anyArgs.where = { ...anyArgs.where, tenantId };
        } else if (['create', 'createMany'].includes(operation)) {
          if (Array.isArray(anyArgs.data)) {
            anyArgs.data = anyArgs.data.map((d: any) => ({ ...d, tenantId }));
          } else {
            anyArgs.data = { ...anyArgs.data, tenantId };
          }
        } else if (['upsert'].includes(operation)) {
          anyArgs.where = { ...anyArgs.where, tenantId };
          anyArgs.create = { ...anyArgs.create, tenantId };
        }

        return query(args);
      },
    },
  },
});

export { tenantContext, getTenantId };
export * from './middleware';
