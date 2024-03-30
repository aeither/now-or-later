import { ActionBody } from '@/app/api/qstash/route';
import { env } from '@/env';
import { Resend } from 'resend';

export const sendEmail = async (actionBody: ActionBody) => {
  const resend = new Resend(env.RESEND_TOKEN);

  const data = {
    to: 'xobey93582@otemdi.com',
    title: 'Report',
    price: 70123,
  };

  try {
    const response = await resend.emails.send({
      from: 'hello@neonlaunch.xyz',
      to: data.to,
      subject: data.title,
      html: `<p>The Bitcoin price is <strong>${data.price}</strong>!</p>`,
    });

    if (response.data) {
      console.log('Message sent successfully');
    } else {
      console.error('Error sending message:', response.error);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
