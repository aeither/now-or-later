import { ActionBody } from '@/app/api/qstash/route';
import { env } from '@/env';

export const sendMessageToTelegram = async (messageText: string) => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: messageText,
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      console.log('Message sent successfully');
    } else {
      console.error('Error sending message:', data.description);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
