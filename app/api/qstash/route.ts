type ActionTypes = 'mint' | 'deploy' | 'watch';

export interface ActionBody {
  type: ActionTypes;
  userAddress: string;
  privateKey: string;
  address: string;
  amount: number;
  delay: number;
  times: number;
  chain?: string;
}

import { redis } from '@/lib/redis';
import { deployToken } from '@/lib/thirdweb/deployToken';
import { mintToken } from '@/lib/thirdweb/mintToken';
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
  return NextResponse.json('data');
}
