import { Inject, Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import { EMAIL_CONFIG_OPTIONS, EmailOptions } from "./email.interface";

@Injectable()
export class EmailService {
  private nodeMailerTransport: Mail;
  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.nodeMailerTransport = createTransport({
      service: this.options.service,
      auth: {
        user: this.options.user,
        pass: this.options.pass,
      },
    });
  }
  sendEmail(options: Mail.Options) {
    return this.nodeMailerTransport.sendMail(options);
  }
}
