'use server';

import { qstashClient } from '@/lib/upstash';

type State = 'CREATED' | 'ACTIVE' | 'DELIVERED' | 'ERROR' | 'RETRY' | 'FAILED';
type Event = {
  time: number;
  state: State;
  messageId: string;
  nextDeliveryTime?: number;
  error?: string;
  url: string;
  topicName?: string;
  endpointName?: string;
};

export async function getQStashMessages() {
  // qstashClient.messages;
  let cursor = Date.now();
  const res = await qstashClient.events({ cursor });
  console.log(res.events);

  return { messages: res.events };
}
