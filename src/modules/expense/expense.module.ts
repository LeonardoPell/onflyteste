import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaModule } from 'src/prisma-module/prisma.module';
import { MailModule } from 'src/core/mail/mail.module';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
