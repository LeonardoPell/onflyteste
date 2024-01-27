import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, createParamDecorator } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from '@nestjs/passport';
import { IsNumberOrThrowParam } from 'src/core/decorators/validators.decorator';
import { AuthUser, AuthData } from 'src/auth/decorators/auth-user.decorator';
import { CreateExpenseDto } from './dto/create.expense.dto';
import { Isub } from 'src/auth/interfaces/payload.interface';
import UpdateExpenseDto from './dto/update.expense.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('expense')
export class ExpenseController {
  constructor(private readonly _expenseService: ExpenseService) {}

  @Get(':userId')
  findAllExpenses(
    @Param('userId', IsNumberOrThrowParam)
    @AuthUser()
    userId: number
    
  ){
    return this._expenseService.findAllExpenses(userId);
  }

  @Post()
  createExpense(
    @Body()
    createExpenseDto: CreateExpenseDto,
    @AuthData()
    authData: Isub
  ){
    return this._expenseService.createExpense(createExpenseDto, authData);
  }

  @Patch(':expenseId')
  updateExpense(
    @Body()
    updateExpenseDto: UpdateExpenseDto,
    @Param('expenseId', IsNumberOrThrowParam)
    expenseId: number,
    @AuthData()
    authData: Isub
  ){
    return this._expenseService.updateExpense(updateExpenseDto, expenseId, authData);
  }

  @Delete(':expenseId')
  deleteExpense(
    @Param('expenseId', IsNumberOrThrowParam)
    expenseId: number,
    @AuthData()
    authData: Isub
  ){
    return this._expenseService.deleteExpense(expenseId, authData);
  }
}
