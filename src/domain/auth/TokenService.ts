export interface TokenService {
  generateAccessToken(payload: {
    sub: string;
    email: string;
    role: string;
  }): string;
}
