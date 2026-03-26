import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { TokenBlacklistService } from './token-blacklist.service';
import { prisma } from '@conecta360/database';

jest.mock('@conecta360/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    activeSession: {
      create: jest.fn(),
    },
  },
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let tokenBlacklistService: TokenBlacklistService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-token'),
    decode: jest.fn().mockReturnValue({ exp: Math.floor(Date.now() / 1000) + 3600 }), // expira em 1h
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key, defaultValue) => defaultValue),
  };

  const mockTokenBlacklistService = {
    add: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: TokenBlacklistService, useValue: mockTokenBlacklistService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    tokenBlacklistService = module.get<TokenBlacklistService>(TokenBlacklistService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('deve retornar o usuário sem a senha se as credenciais forem válidas', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        name: 'Test User',
      };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password123');

      expect(result).not.toHaveProperty('passwordHash');
      expect(result.email).toBe('test@example.com');
    });

    it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.validateUser('wrong@example.com', 'password'))
        .rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
      const mockUser = { email: 'test@example.com', passwordHash: 'hashed' };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.validateUser('test@example.com', 'wrong-pass'))
        .rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('deve retornar access_token e refresh_token', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test', role: 'user', tenantId: 't1' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-refresh');
      (prisma.user.update as jest.Mock).mockResolvedValue({});

      const result = await service.login(mockUser, '127.0.0.1', 'Mozilla/5.0');

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(mockJwtService.sign).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('deve adicionar o token à blacklist com o timestamp de expiração correto', async () => {
      const mockExp = Math.floor(Date.now() / 1000) + 3600;
      (mockJwtService.decode as jest.Mock).mockReturnValue({ exp: mockExp });
      (prisma.user.update as jest.Mock).mockResolvedValue({});

      await service.logout('user-1', 'access-token');

      expect(tokenBlacklistService.add).toHaveBeenCalledWith('access-token', mockExp * 1000);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { refreshToken: null },
      });
    });
  });
});
