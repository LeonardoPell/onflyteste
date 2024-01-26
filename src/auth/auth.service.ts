import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Isub } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(userId: number): Promise<string> {
    const payload = { sub: {userId} };
    return this.jwtService.sign(payload);
  }

  async validateUser(sub: Isub): Promise<boolean> {
    return true;
  }
}