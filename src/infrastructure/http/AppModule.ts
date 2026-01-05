import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EmployeeModule } from './EmployeeModule';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import { AuthModule } from './AuthModule';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeeModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
