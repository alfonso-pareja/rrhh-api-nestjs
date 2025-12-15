import { TokenService } from './TokenService';

export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  login(email: string, password: string) {
    // MOCKED USER VALIDATION
    if (email !== 'admin@test.com' || password !== '1234') {
      throw new Error('Invalid credentials');
    }

    return {
      accessToken: this.tokenService.generateAccessToken({
        sub: '1',
        email,
        role: 'ADMIN',
      }),
    };
  }
}
