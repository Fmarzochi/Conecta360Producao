import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TenantGuard } from '@conecta360/database';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: TenantGuard,
    },
  ],
})
export class AppModule {}
