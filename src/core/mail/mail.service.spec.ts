import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { mailData } from './mock-data/mock-data';

describe('MailService', () => {
  let service: MailService;
  let mail: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(true)
          }
        }
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    mail = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mail).toBeDefined();
  });

  describe('sendMail', () => {
    it('should send an email and return true', async () => {
      
      const result = await service.sendMail(mailData);

      expect(result).toBeTruthy();
      expect(mail.sendMail).toHaveBeenCalledTimes(1);
    });

    it('should throw Error if any error happens', () => {

      jest.spyOn(mail, 'sendMail').mockRejectedValueOnce(new Error());

      expect(service.sendMail(mailData)).rejects.toThrow(Error);
    });
  });
});
