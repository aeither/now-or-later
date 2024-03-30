'use client';
// pages/qstash.tsx

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { getQStashMessages } from '../actions/qstash';
import { Button } from '@/components/ui/button';
import {
  formatTimeAgo,
  formatTimeFromNow,
  truncateString,
} from '@/lib/utils/helpers';

type EventSimple = {
  messageId: string;
  time: number;
  state: string;
  nextDeliveryTime?: number;
};

export default function QStashPage() {
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
    <div className='container mx-auto py-10'>
      <Button onClick={callGetMessages}>test</Button>
      <h1 className='text-3xl font-bold mb-6'>Upstash QStash Messages</h1>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-4'>Created Messages</h1>
        <ul className='space-y-2'>
          {createdMessages.map(
            ({ messageId, time, state, nextDeliveryTime }) => (
              <li key={messageId} className='p-4 rounded-md'>
                <>
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
                  {/* <div>{state}</div> */}
                </>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
