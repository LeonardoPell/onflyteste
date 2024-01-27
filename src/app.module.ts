import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ExpenseModule } from './modules/expense/expense.module';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UserModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
