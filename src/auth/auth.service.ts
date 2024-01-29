import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Isub } from './interfaces/payload.interface';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly _userService: UserService
  ) {}

  async generateToken(userId: number): Promise<string> {
    try {
      const user = await this._userService.findOneById(userId);
      const payload = { sub: {userId: user.id, userEmail:user.email} };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async validateUser(sub: Isub): Promise<boolean> {
    try {
      await this._userService.findOneById(sub.userId);
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}