import { env } from '@/env';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_TOKEN);

resend.emails.send({
  from: 'hello@neonlaunch.xyz',
  to: 'MYEMAIL@hotmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
});
