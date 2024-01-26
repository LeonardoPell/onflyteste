import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { notAcceptableTypeParamMessage, notFoundExceptionMessage } from 'src/core/exceptions/exception.message';
import { PrismaService } from 'src/prisma-module/prisma.service';


@Injectable()
export class UserService {
  
  constructor(private _prismaService: PrismaService) {}

  async findOneById(userId: number): Promise<User> {

    if (isNaN(Number(userId))) {
      throw new NotAcceptableException(notAcceptableTypeParamMessage('User id', 'Number'));
    } 
      
    try {
      const userOrThrow = await this._prismaService.user.findUnique({ where: { id: Number(userId) }});

      if(!userOrThrow){
        throw new NotFoundException(notFoundExceptionMessage('User'));
      }

      return userOrThrow;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

}