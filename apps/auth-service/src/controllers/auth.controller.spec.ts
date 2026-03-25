// Mock de infraestrutura — DEVE ficar ANTES de qualquer import que dependa dele
jest.mock('@conecta360/database', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
  Public: () => () => { },
  IS_PUBLIC_KEY: 'isPublic',
}));

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { APP_PIPE } from '@nestjs/core';
import { AppModule, validationPipeConfig } from '../app.module';

describe('AuthController (Integration)', () => {
  let app: INestApplication;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    tenantId: 'tenant-1',
  };

  const mockLoginResponse = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    user: mockUser,
  };

  const mockAuthService = {
    login: jest.fn().mockResolvedValue(mockLoginResponse),
    getProfile: jest.fn().mockResolvedValue(mockUser),
    logout: jest.fn().mockResolvedValue({ message: 'Logout realizado com sucesso' }),
    refreshTokens: jest.fn().mockResolvedValue(mockLoginResponse),
    validateUser: jest.fn().mockResolvedValue(mockUser),
  };

  const mockJwtService = {
    verify: jest.fn().mockReturnValue({ sub: '1', tenantId: 'tenant-1', role: 'user' }),
    sign: jest.fn().mockReturnValue('mock-token'),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe(validationPipeConfig),
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();

    // Simula req.user em todas as requisições (como se o JwtAuthGuard tivesse validado)
    app.use((req: any, _res: any, next: any) => {
      req.user = { userId: '1', tenantId: 'tenant-1', role: 'user' };
      next();
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    it('deve retornar 200 e os tokens quando as credenciais são válidas', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(res.body).toHaveProperty('refresh_token');
      expect(res.body.user.email).toBe('test@example.com');
      expect(mockAuthService.login).toHaveBeenCalled();
    });

    it('deve retornar 400 se o email for inválido', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'email-invalido', password: 'password123' })
        .expect(400);
    });

    it('deve retornar 400 se a senha tiver menos de 6 caracteres', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: '123' })
        .expect(400);
    });

    it('deve retornar 400 se faltar o campo email', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'password123' })
        .expect(400);
    });

    it('deve retornar 400 se faltar o campo password', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com' })
        .expect(400);
    });
  });

  describe('POST /auth/refresh', () => {
    it('deve retornar 200 e novos tokens com um refreshToken válido', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'valid-refresh-token' })
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(mockJwtService.verify).toHaveBeenCalledWith('valid-refresh-token');
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith('1', 'valid-refresh-token');
    });

    it('deve retornar 401 se o refreshToken for inválido (verify lança erro)', async () => {
      mockJwtService.verify.mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'token-invalido' })
        .expect(401);
    });

    it('deve retornar 400 se faltar o campo refreshToken', async () => {
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({})
        .expect(400);
    });
  });

  describe('POST /auth/logout', () => {
    it('deve retornar 200 ao fazer logout com token válido', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', 'Bearer valid-access-token')
        .expect(200);

      expect(res.body.message).toBe('Logout realizado com sucesso');
      expect(mockAuthService.logout).toHaveBeenCalledWith('1', 'valid-access-token');
    });
  });

  describe('GET /auth/profile', () => {
    it('deve retornar 200 e os dados do usuário autenticado', async () => {
      const res = await request(app.getHttpServer())
        .get('/auth/profile')
        .set('Authorization', 'Bearer valid-access-token')
        .expect(200);

      expect(res.body.email).toBe('test@example.com');
      expect(res.body.name).toBe('Test User');
      expect(mockAuthService.getProfile).toHaveBeenCalledWith('1');
    });
  });
});
