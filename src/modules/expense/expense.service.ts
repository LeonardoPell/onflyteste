import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Expense } from '@prisma/client';
import { notFoundExceptionMessage } from 'src/core/exceptions/exception.message';
import { PrismaService } from 'src/prisma-module/prisma.service';
import { CreateExpenseDto } from './dto/create.expense.dto';
import { Isub } from 'src/auth/interfaces/payload.interface';
import { Iexpense, expenseInterfaceMap } from './interfaces/expense.interface';
import UpdateExpenseDto from './dto/update.expense.dto';

@Injectable()
export class ExpenseService {

    constructor(private _prismaService: PrismaService){}

    async findAllExpenses(userId: number): Promise<Expense[]>{
        try {
            const expenses = await this._prismaService.expense.findMany(
                {
                    where: {
                        userId
                    },
                    include: {
                        user: true,
                      },
                }
            );

            if(!expenses.length){
                throw new NotFoundException(notFoundExceptionMessage('Expenses', true));
            }

            return expenses;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async createExpense(createExpenseDto: CreateExpenseDto, authdata: Isub): Promise<Expense>{
        const expenseData: Iexpense = expenseInterfaceMap(createExpenseDto,Number(authdata.userId));
        try {
            const expenseCreate = await this._prismaService.expense.create({data: expenseData as Expense});

            return expenseCreate;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async updateExpense(updateExpenseDto: UpdateExpenseDto, expenseId: number, authData: Isub): Promise<Expense>{
        try {
            const expense = await this._prismaService.expense.findUnique({ where: {id: expenseId} });

            if(!expense){
                throw new NotFoundException(notFoundExceptionMessage('Expense'));
            }

            if(Number(expense.userId) !== Number(authData.userId)){
                throw new UnauthorizedException();
            }

            Object.assign(expense,updateExpenseDto);

            const updatedEpense = await this._prismaService.expense.update({
                where: {
                    id: expenseId
                },
                data: expense
            });

            return updatedEpense;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    async deleteExpense(expenseId: number, authData: Isub): Promise<Expense>{
        try {
            const expense = await this._prismaService.expense.findUnique({ where: {id: expenseId} });

            if(!expense){
                throw new NotFoundException(notFoundExceptionMessage('Expense'));
            }

            if(Number(expense.userId) !== Number(authData.userId)){
                throw new UnauthorizedException();
            }

            const deletedExpense = await this._prismaService.expense.delete({ where: {id: expenseId} });

            return deletedExpense;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}
