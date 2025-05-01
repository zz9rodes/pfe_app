import nodemailer, { Transporter } from 'nodemailer';
import env from '#start/env'


export const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Remplacez par votre hôte SMTP
    port: 587, // Utilisez 465 pour SSL
    secure: false, // true pour 465, false pour d'autres ports
    auth: {
      user: env.get('GMAIL_USERNAME'), // Votre adresse e-mail
      pass: env.get('GMAIL_PASSWORD'), 
    },
  });