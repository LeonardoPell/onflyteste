import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants';
import { Isub } from '../interfaces/payload.interface';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    const decodedToken = jwt.verify(token, jwtConstants.secret);
    const userData: Isub = decodedToken.sub as any;
    if(isNaN(Number(request.params.userId)) || isNaN(Number(userData.userId))){
      throw new UnauthorizedException();
    }
    if(Number(request.params.userId) !== Number(userData.userId)){
      throw new UnauthorizedException();
    }
  },
);

export const AuthData = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    const decodedToken = jwt.verify(token, jwtConstants.secret);
    const userData: Isub = decodedToken.sub as any;
    return userData;
  },
);