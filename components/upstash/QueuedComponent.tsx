'use client';

import { getQStashMessages } from '@/app/actions/qstash';
import {
  formatTimeAgo,
  formatTimeFromNow,
  truncateString,
} from '@/lib/utils/helpers';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type EventSimple = {
  messageId: string;
  time: number;
  state: string;
  nextDeliveryTime?: number;
};

export default function QueuedComponent() {
  const [createdMessages, setCreatedMessages] = useState<EventSimple[]>([]);

  const currentTime = new Date().getTime();

  const callGetMessages = async () => {
    // console.log('🚀 ~ callGetMessages ~ before ');
    // const messages = await getQStashMessages();
    console.log('🚀 ~ callGetMessages ~ messages:', createdMessages);
  };

  useEffect(() => {
    const fetchMessages = async () => {
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

      setCreatedMessages(uniqueCreatedMessageIds);
    };

    fetchMessages();
  }, []);

  return (
    <div className='mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Queued Messages</h1>
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
