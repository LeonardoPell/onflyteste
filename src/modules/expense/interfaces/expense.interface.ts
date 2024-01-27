import { Isub } from "src/auth/interfaces/payload.interface";
import { CreateExpenseDto } from "../dto/create.expense.dto";

export interface Iexpense{
    id?: number;
    description: string;
    date: Date;
    amount: number;
    userId: number;
}

export function expenseInterfaceMap(dto: CreateExpenseDto, userId: number): Iexpense{
    const expense: Iexpense = {...dto, userId};
    return expense;
}