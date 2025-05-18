

import { transporter } from '#config/nodemailer'
import { DateTime } from 'luxon'
import Email from '#models/email'
import { EmailData } from '#models/utils/index'
import { removeEmptyFields } from '#models/utils/helper'



export default class EmailEmiterService {

  public async sendEmail(data: EmailData): Promise<Email> {
    
    const email = await Email.create({
      ...data,
      status: 'pending',
    })

   await email.load('sender')
   await email.load('recipient')

    const mailOptions = {
      from: email.sender.email,
      to: email.recipient.email,
      cc: email.cc,
      bcc: email.bcc,
      subject: email.subject,
      text: email.text,
      html: email.html,
      replyTo: email.sender.email
    };


    try {
      try {

        const info = await transporter.sendMail(removeEmptyFields(mailOptions));

        email.status = 'sent';
        email.sent_at = DateTime.now();
      } catch (error) {
        email.status = 'failed';
        email.error_message = error.message;
      }

      await email.save();
      return email;
    } catch (error) {
      email.status = 'failed'
      email.error_message = error.message
    }

    await email.save()
    return email
  }
}
