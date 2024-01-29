import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConstants } from './constants';

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: mailConstants.host_mail,
      secure: false,
      auth: {
        user: mailConstants.user_mail,
        pass: mailConstants.user_pass
      }
    }
  })],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
