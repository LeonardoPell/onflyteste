import { Expense } from "@prisma/client";
import { Isub } from "src/auth/interfaces/payload.interface";
import { CreateExpenseDto } from "../dto/create.expense.dto";
import UpdateExpenseDto from "../dto/update.expense.dto";

export const expenseList: Expense[] = [
    {
      id: 1,
      description: "Expense description",
      date: new Date("2024-01-28T12:00:00.000Z"),
      amount: 20,
      userId: 1,
    },
    {
      id: 2,
      description: "Expense description",
      date: new Date("2024-01-28T12:00:00.000Z"),
      amount: 20,
      userId: 1,
    },
    {
      id: 3,
      description: "Expense description",
      date: new Date("2024-01-28T12:00:00.000Z"),
      amount: 20,
      userId: 1,
    },
  ];

  export const authData: Isub = {
    userId: 1
  }

  export const expenseToCreate: CreateExpenseDto = {
    description: "Expense description",
    date: new Date("2024-01-28T12:00:00.000Z"),
    amount: 20,
  }

  export const expenseToEdit: UpdateExpenseDto = {
    description: "updated description",
  }

  export const updatedExpense = Object.assign({...expenseList[0]},expenseToEdit);
  