import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { sub: {userId} };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any): Promise<any> {
    return { userId: payload.sub, username: 'username' };
  }
}