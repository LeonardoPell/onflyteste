import { PartialType } from "@nestjs/mapped-types";
import { CreateExpenseDto } from "./create.expense.dto";

export default class UpdateExpenseDto extends PartialType(CreateExpenseDto){}