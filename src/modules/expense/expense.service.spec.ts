import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { HttpException, NotFoundException } from '@nestjs/common';
import { expenseList, authData, expenseToCreate, expenseToEdit, updatedExpense } from './mock-data/mock-data';

describe('ExpenseService', () => {
  let service: ExpenseService;
  let prisma: PrismaService;

  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, 
        {
          provide: PrismaService,
          useValue: {
            expense: {
              findMany: jest.fn().mockResolvedValue(expenseList),
              create: jest.fn().mockResolvedValue(expenseList[0]),
              update: jest.fn().mockResolvedValue(updatedExpense),
              findUnique: jest.fn().mockResolvedValue(expenseList[0]),
              delete: jest.fn().mockResolvedValue(expenseList[0]),
            }
          }
        }
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('findAllExpenses', () => {
    it('should return a list of expenses', async () => {
      const result = await service.findAllExpenses(1);

      expect(result).toEqual(expenseList);
      expect(prisma.expense.findMany).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if no expense is found', () => {
      jest.spyOn(prisma.expense,'findMany').mockRejectedValueOnce(new NotFoundException());

      expect(service.findAllExpenses(1)).rejects.toThrow(HttpException);
    });
  });

  describe('createExpense', () => {
    it('should create an expense and return it', async () => {
      const result = await service.createExpense(expenseToCreate,authData);

      expect(prisma.expense.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expenseList[0]);
    });

    it('should throw HttpException if any error happens with prisma create', () => {
      jest.spyOn(prisma.expense,'create').mockRejectedValueOnce(new Error());

      expect(service.createExpense(expenseToCreate,authData)).rejects.toThrow(HttpException);
    });
  });

  describe('updateExpense', () => {
    it('should edit an expense and return it', async () => {
      const result = await service.updateExpense(expenseToEdit,1,authData);

      expect(prisma.expense.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.expense.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedExpense);
    });

    it('should throw HttpException if expense is not found', () => {
      
      jest.spyOn(prisma.expense, 'findUnique').mockRejectedValueOnce(new NotFoundException());

      expect(service.updateExpense(expenseToEdit,1,authData)).rejects.toThrow(HttpException);
    });

    it('should throw HttpException if any error happens with prisma update', () => {
      jest.spyOn(prisma.expense, 'update').mockRejectedValueOnce(new Error());

      expect(service.updateExpense(expenseToEdit,1,authData)).rejects.toThrow(HttpException);
    });
  });

  describe('deleteExpense', () => {
    it('should delete an expense and return it', async () => {
      const result = await service.deleteExpense(1,authData);

      expect(prisma.expense.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.expense.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expenseList[0]);
    });

    it('should throw HttpException if expense is not found', () => {
      
      jest.spyOn(prisma.expense, 'findUnique').mockRejectedValueOnce(new NotFoundException());

      expect(service.deleteExpense(1,authData)).rejects.toThrow(HttpException);
    });

    it('should throw HttpException if any error happens with prisma delete', () => {
      jest.spyOn(prisma.expense, 'delete').mockRejectedValueOnce(new Error());

      expect(service.deleteExpense(1,authData)).rejects.toThrow(HttpException);
    });
  });
});
