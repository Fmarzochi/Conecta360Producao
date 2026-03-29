import * as dotenv from 'dotenv';
import * as path from 'path';

/**
 * Carrega as variaveis de ambiente.
 * O .env local (na raiz do serviço) tem prioridade sobre o .env global da pasta apps.
 * O .env local (na raiz do serviço) lê o .env global da pasta apps.
 */
export const loadConfig = () => {
  // 1. Carrega o .env local da raiz do serviço
  // Variaveis ja definidas em process.env (do .env local ou do shell) nao serao sobrescritas
  dotenv.config();

  // 2. Carrega o .env global da pasta apps
  // Variaveis ja definidas em process.env (do .env local ou do shell) nao serao sobrescritas
  const globalEnvPath = path.resolve(__dirname, '../../../apps/.env');
  dotenv.config({ path: globalEnvPath });

  console.log(`Config initialized. Global env from: ${globalEnvPath}`);
};
