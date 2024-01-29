import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ImailData } from './interfaces/mail.interface';

@Injectable()
export class MailService {
    
    constructor(private _mailerService: MailerService){}
    
    async sendMail(mailData: ImailData) {
      try {
        await this._mailerService.sendMail(mailData);
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }
}
