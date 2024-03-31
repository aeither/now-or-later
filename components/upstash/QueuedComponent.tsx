'use client';

import { getQStashMessages } from '@/app/actions/qstash';
import {
  formatTimeAgo,
  formatTimeFromNow,
  truncateString,
} from '@/lib/utils/helpers';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';

type EventSimple = {
  messageId: string;
  time: number;
  state: string;
  nextDeliveryTime?: number;
};

const fetchMessages = async () => {
  const currentTime = new Date().getTime();
  const { messages } = await getQStashMessages();
  const uniqueCreatedMessageIds: EventSimple[] = [];

  messages.forEach((event) => {
    if (
      event.state === 'CREATED' &&
      event.nextDeliveryTime &&
      event.nextDeliveryTime > currentTime
    ) {
      uniqueCreatedMessageIds.push({
        messageId: event.messageId,
        state: event.state,
        time: event.time,
        nextDeliveryTime: event.nextDeliveryTime,
      });
    }
  });

  return uniqueCreatedMessageIds;
};

export default function QueuedComponent() {
  const [createdMessages, setCreatedMessages] = useState<EventSimple[]>([]);

  const callGetMessages = async () => {
    console.log('🚀 ~ callGetMessages ~ messages:', createdMessages);
    const uniqueCreatedMessageIds = await fetchMessages();

    setCreatedMessages(uniqueCreatedMessageIds);
  };

  useEffect(() => {
    callGetMessages();
  }, []);

  return (
    <div className='mx-auto px-4 py-8'>
      <div className='flex flex-row w-full justify-between'>
        <h1 className='text-3xl font-bold mb-4'>Queued Messages</h1>
        <Button onClick={callGetMessages}>{<RefreshCw />}</Button>
      </div>
      <ul className='space-y-2'>
        {createdMessages.map(({ messageId, time, state, nextDeliveryTime }) => (
          <>
            <Card key={messageId}>
              <CardHeader>
                <CardTitle className='text-2xl'>
                  {truncateString(messageId, 10)}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>{messageId}</div>
                <div>
                  Executes in{' '}
                  {formatTimeFromNow(
                    nextDeliveryTime?.toString() ||
                      new Date().getTime().toString()
                  )}
                </div>
                <div>
                  Scheduled{' '}
                  {formatTimeAgo(
                    time.toString() || new Date().getTime().toString()
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        ))}
      </ul>
    </div>
  );
}
