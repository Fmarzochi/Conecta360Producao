import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private readonly blacklist = new Set<string>();

  /**
   * Adiciona um token à blacklist (usado no logout).
   */
  add(token: string): void {
    this.blacklist.add(token);
    this.logger.log('Token adicionado à blacklist');
  }

  /**
   * Verifica se um token está na blacklist.
   */
  isBlacklisted(token: string): boolean {
    return this.blacklist.has(token);
  }
}
