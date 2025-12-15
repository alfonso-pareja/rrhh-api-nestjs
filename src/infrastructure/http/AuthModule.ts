// infrastructure/http/AuthModule.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthController } from 'src/interfaces/auth/AuthController';
import { JwtStrategy } from '../auth/JwtStrategy';
import { JwtTokenService } from '../auth/JwtTokenService';
import { AuthService } from 'src/domain/auth/AuthService';
import { LoginUseCase } from 'src/application/auth/Login.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtTokenService,
    {
      provide: AuthService,
      useFactory: (tokenService) => new AuthService(tokenService),
      inject: [JwtTokenService],
    },
    {
      provide: LoginUseCase,
      useFactory: (authService) => new LoginUseCase(authService),
      inject: [AuthService],
    },
  ],
})
export class AuthModule {}
