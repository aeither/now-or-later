import { redis } from '@/lib/redis';
import { Client } from '@upstash/qstash';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN || '',
});

export async function POST(request: Request) {
  try {
    const host = request.headers.get('host');
    const body = await request.json();

    console.log('schedule', body);

    const qstashResponse = await qstashClient.publishJSON({
      url: `https://${host}/api/qstash`,
      body,
      notBefore: body?.timestamp,
    });

    const postId = Date.now().toString();
    await redis!.hset(postId, body);

    return NextResponse.json(qstashResponse);
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
