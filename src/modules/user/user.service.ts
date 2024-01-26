import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { notFoundExceptionMessage } from 'src/core/exceptions/exception.message';
import isNumberOrThrow from 'src/core/functions/validators/isNumberOrThrow';
import { PrismaService } from 'src/prisma-module/prisma.service';


@Injectable()
export class UserService {

  constructor(private _prismaService: PrismaService) {}

  async findOneById(userId: number): Promise<User> {

    userId = isNumberOrThrow(userId, 'User id');
      
    try {
      const userOrThrow = await this._prismaService.user.findUnique({ where: { id: userId }});

      if(!userOrThrow){
        throw new NotFoundException(notFoundExceptionMessage('User'));
      }

      return userOrThrow;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

}