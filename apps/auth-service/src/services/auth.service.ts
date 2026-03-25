import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { prisma } from '@conecta360/database';
import { TokenBlacklistService } from './token-blacklist.service';
import { LoginResponse } from 'src/dtos/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenBlacklistService: TokenBlacklistService,
  ) { }

  /**
   * Valida as credenciais do usuário.
   * Retorna o usuário (sem passwordHash) se válido, ou lança exceção.
   */
  async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      this.logger.warn(`Tentativa de login com email inexistente: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      this.logger.warn(`Senha inválida para o usuário: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    this.logger.log(`Usuário autenticado: ${email}`);

    const { passwordHash, refreshToken, ...result } = user;
    return result;
  }

  /**
   * Gera access token e refresh token após validação bem-sucedida.
   */
  async login(user: any): Promise<LoginResponse> {
    const { id, email, name, role, tenantId } = user;
    const payload = {
      sub: id,
      tenantId,
      role,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
    });

    // Armazena o hash do refresh token no banco
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    this.logger.log(`Tokens gerados para o usuário: ${user.email}`);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id,
        email,
        name,
        role,
        tenantId,
      },
    };
  }

  /**
   * Renova os tokens usando o refresh token.
   * Implementa rotação de refresh token para maior segurança.
   */
  async refreshTokens(userId: string, refreshToken: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Acesso negado');
    }

    const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    const { passwordHash, refreshToken: storedToken, ...userData } = user;
    return this.login(userData);
  }

  /**
   * Invalida o access token (blacklist) e remove o refresh token do banco.
   */
  async logout(userId: string, accessToken: string) {
    // Adiciona access token à blacklist
    this.tokenBlacklistService.add(accessToken);

    // Remove refresh token do banco
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    this.logger.log(`Logout realizado para userId: ${userId}`);

    return { message: 'Logout realizado com sucesso' };
  }

  /**
   * Retorna o perfil do usuário autenticado.
   */
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const { passwordHash, refreshToken, ...profile } = user;
    return profile;
  }
}
