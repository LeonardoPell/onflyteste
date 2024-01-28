import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { authData, expenseList, expenseToCreate, expenseToEdit, updatedExpense } from './mock-data/mock-data';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('ExpenseController', () => {
  let controller: ExpenseController;
  let service: ExpenseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        {
          provide: ExpenseService,
          useValue: {
            findAllExpenses: jest.fn().mockResolvedValue(expenseList),
            createExpense: jest.fn().mockResolvedValue(expenseList[0]),
            updateExpense: jest.fn().mockResolvedValue(updatedExpense),
            deleteExpense: jest.fn().mockResolvedValue(expenseList[0]),
          } 
        }
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAllExpenses', () => {
    it('should return a list of expenses successfully', async () => {
      const result = await controller.findAllExpenses(1);

      expect(result).toEqual(expenseList);
      expect(service.findAllExpenses).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if no user is found', () => {
      jest.spyOn(service, 'findAllExpenses').mockRejectedValueOnce(new NotFoundException());

      expect(controller.findAllExpenses(1)).rejects.toThrow(HttpException);
    });
  });

  describe('createExpense', () => {
    it('should create a new expense successfully and return it', async () => {
      const result = await controller.createExpense(expenseToCreate, authData);

      expect(result).toEqual(expenseList[0]);
      expect(service.createExpense).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if any erro happens', () => {
      jest.spyOn(service, 'createExpense').mockRejectedValueOnce(new Error());

      expect(controller.createExpense(expenseToCreate, authData)).rejects.toThrow(Error);
    });
  });

  describe('updateExpense', () => {
    it('should edit an expense successfully and return it', async () => {
      const result = await controller.updateExpense(expenseToEdit, 1, authData);

      expect(result).toEqual(updatedExpense);
      expect(service.updateExpense).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if any erro happens', () => {
      jest.spyOn(service, 'updateExpense').mockRejectedValueOnce(new Error());

      expect(controller.updateExpense(expenseToEdit, 1, authData)).rejects.toThrow(Error);
    });
  });

  describe('deleteExpense', () => {
    it('should delete an expense successfully and return it', async () => {
      const result = await controller.deleteExpense(1, authData);

      expect(result).toEqual(expenseList[0]);
      expect(service.deleteExpense).toHaveBeenCalledTimes(1);
    });

    it('should throw HttpException if any erro happens', () => {
      jest.spyOn(service, 'deleteExpense').mockRejectedValueOnce(new Error());

      expect(controller.deleteExpense(1, authData)).rejects.toThrow(Error);
    });
  });
});
