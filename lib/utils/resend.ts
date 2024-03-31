import { ActionBody } from '@/app/api/qstash/route';
import { env } from '@/env';
import { Resend } from 'resend';
import { getCurrentDateTime } from './helpers';

const fetchBTCPrice = async () => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/bitcoin'
  );
  const data = await response.json();
  return data.market_data.current_price.usd as string;
};

export const sendEmail = async (actionBody: ActionBody) => {
  const resend = new Resend(env.RESEND_TOKEN);

  const title = `Report ${getCurrentDateTime()}`;
  const price = await fetchBTCPrice();
  const data = {
    to: 'xobey93582@otemdi.com',
    title: title,
    price: price,
  };

  try {
    const response = await resend.emails.send({
      from: 'hello@neonlaunch.xyz',
      to: actionBody.email || data.to,
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
