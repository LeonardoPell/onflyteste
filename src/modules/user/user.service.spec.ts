import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { User } from '@prisma/client';
import { HttpException, NotAcceptableException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockUser: User = {
    id: 1,
    name: 'onflyUser',
    email: 'onflytesteleonardo@gmail.com'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser)
            },
          }
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findOneById', () => {
    it('should find and return a user', async () => {

      const result = await service.findOneById(1);

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if no user is found', () => {

      jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new NotFoundException());

      expect(service.findOneById(2)).rejects.toThrow(HttpException);
    });
  });
});
