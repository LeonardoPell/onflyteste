import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/:id')
  async getToken(@Param('id') userId: number): Promise<{ token: string }> {
    const token = await this.authService.generateToken(userId);
    return { token };
  }
}