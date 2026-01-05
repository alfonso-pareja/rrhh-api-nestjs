import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../../infrastructure/auth/Public';
import { LoginUseCase } from '../../application/auth/Login.usecase';
import { LoginDto } from './LoginDto';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.loginUseCase.execute(body);
  }
}
