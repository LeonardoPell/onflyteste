import { IsString, IsNumber, MaxLength, IsPositive, IsDateString } from 'class-validator';
import { IsDateGreaterThanCurrent } from 'src/core/decorators/validators.decorator';

export class CreateExpenseDto {

  @IsString()
  @MaxLength(191)
  description: string;

  @IsDateString()
  @IsDateGreaterThanCurrent({message: "date must be less than or equal to the current date"})
  date: Date;

  @IsPositive()
  @IsNumber()
  amount: number;
}