import { redis } from '@/lib/redis';
import { Client } from '@upstash/qstash';
import { NextResponse } from 'next/server';
import { ActionBody } from '../qstash/route';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const host = request.headers.get('host');
    const body: ActionBody = await request.json();
    const times = body.times || 1; // Default to 1 if times is not provided

    console.log('schedule', body);

    const promises = [];
    for (let i = 0; i < times; i++) {
      const qstashResponse = qstashClient.publishJSON({
        url: `https://${host}/api/qstash`,
        body,
        delay: body.delay + i * 10, // separate each call by 10 seconds
      });
      promises.push(qstashResponse);
    }

    const qstashResponses = await Promise.all(promises);

    await redis!.hset(body.userAddress, { privateKey: body.privateKey });

    return NextResponse.json(qstashResponses);
  } catch (error) {
    console.log(error);
    return NextResponse.json('An error occurred. Please try again later.', {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('messageId');

    if (!messageId) {
      return NextResponse.json('Missing messageId parameter', { status: 400 });
    }

    const deleteResponse = await qstashClient.messages.delete(messageId);

    return NextResponse.json(deleteResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json('An error occurred. Please try again later.', {
      status: 500,
    });
  }
}
