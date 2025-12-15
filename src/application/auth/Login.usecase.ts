import { AuthService } from 'src/domain/auth/AuthService';

export class LoginUseCase {
  constructor(private readonly authService: AuthService) {}

  execute(input: { email: string; password: string }) {
    return this.authService.login(input.email, input.password);
  }
}
