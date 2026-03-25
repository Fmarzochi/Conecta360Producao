import { Injectable, Logger } from '@nestjs/common';

/**
 * SERVIÇO DE BLACKLIST DE TOKENS (Abordagem Stateless)
 * 
 * Este serviço verifica os usuarios que fizeram logout e adiciona os tokens na blacklist e remove os que já expiraram a cada 1 hora otimizando o sistema para não perder performance com o aumento de usuarios.
 * 
 */
@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);

  private readonly blacklist = new Map<string, number>();

  add(token: string, expiresAt: number): void {
    this.blacklist.set(token, expiresAt);
    this.logger.log(`Token invalidado até: ${new Date(expiresAt).toISOString()}`);
  }

  isBlacklisted(token: string): boolean {
    const expiresAt = this.blacklist.get(token);
    if (!expiresAt) return false;

    if (Date.now() > expiresAt) {
      this.blacklist.delete(token);
      return false;
    }

    return true;
  }

  cleanup(): void {
    const now = Date.now();
    let count = 0;
    for (const [token, expiresAt] of this.blacklist.entries()) {
      if (now > expiresAt) {
        this.blacklist.delete(token);
        count++;
      }
    }
    if (count > 0) {
      this.logger.log(`Cleanup: ${count} tokens expirados removidos da blacklist`);
    }
  }
}
