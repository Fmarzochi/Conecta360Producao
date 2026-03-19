export * from '@conecta360/config';
export * from '@conecta360/database';

import { Express } from 'express';
import { tenantMiddleware } from '@conecta360/database';
import { loadConfig } from '@conecta360/config';

/**
 * Initializes the application with common settings.
 * @param app Express application
 */
export const initializeApp = (app: Express) => {
  loadConfig();
  app.use(tenantMiddleware);
};
