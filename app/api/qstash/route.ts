type ActionTypes = 'mint' | 'deploy' | 'telegram' | 'email';

export interface ActionBody {
  type: ActionTypes;
  userAddress: string;
  privateKey: string;
  address: string;
  amount: number;
  delay: number;
  times: number;
  chain?: string;
  title?: string;
}

import { redis } from '@/lib/redis';
import { deployToken } from '@/lib/thirdweb/deployToken';
import { mintToken } from '@/lib/thirdweb/mintToken';
import { sendEmail } from '@/lib/utils/resend';
import { sendMessageToTelegram } from '@/lib/utils/telegram';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body: ActionBody = await request.json();
  const user = (await redis?.hgetall(
    body?.userAddress
  )) as unknown as ActionBody;
  console.log('qstash api: ', user.privateKey);

  if (body.type === 'mint') {
    mintToken(body);
  }

  if (body.type === 'deploy') {
    console.log('deploying token... ', user.privateKey);
    deployToken(body);
  }

  if (body.type === 'telegram') {
    console.log('sending message to Telegram... ');
    sendMessageToTelegram(body);
  }

  if (body.type === 'email') {
    console.log('sending email... ');
    sendEmail(body);
  }

  return NextResponse.json('data');
}
