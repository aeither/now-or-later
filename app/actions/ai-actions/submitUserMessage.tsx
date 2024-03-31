import 'server-only';

import { BotMessage, spinner } from '@/components/llm-stocks';
import QueuedComponent from '@/components/upstash/QueuedComponent';
import { DelayMintComponent } from '@/components/web3/DelayMintComponent';
import { DeployComponent } from '@/components/web3/DeployComponent';
import { ScheduleNewsletterComponent } from '@/components/web3/ScheduleNewsletterComponent';
import { TelegramNotifyComponent } from '@/components/web3/TelegramNotifyComponent';
import { env } from '@/env';
import { runOpenAICompletion } from '@/lib/utils';
import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import OpenAI from 'openai';
import { z } from 'zod';
import { AI } from '../ai';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content,
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className='items-center'>{spinner}</BotMessage>
  );

  const completion = runOpenAICompletion(openai, {
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `\
You are Frog, Defi Companion who is going to help the user navigate defi and interact with protocols.
You can let the user throw confetti, as many times as they want, to celebrate.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
- "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.


If the user requests mint token, call \`delay_mint\`.
If the user requests deploy new token smart contract, call \`deploy_token\`.
If the user requests to send an email or newsletter, call \`schedule_newsletter\`.
If the user requests send message, notification or alert to telegram, call \`telegram_notify\`.
If the user requests list of queued, confirmed, approved list of actions that will be performed, call \`queued_list\`.

Remember you are a conversational bot. Your answers are concise and straight to the point.
Besides that, you can also chat with users and do some calculations if needed.`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],

    functions: [
      {
        name: 'delay_mint',
        description: 'Mint tokens with delay',
        parameters: z.object({}),
      },
      {
        name: 'deploy_token',
        description: 'Deploy new token contract',
        parameters: z.object({}),
      },
      {
        name: 'schedule_newsletter',
        description: 'Schedule email/newsletter',
        parameters: z.object({}),
      },
      {
        name: 'telegram_notify',
        description: 'Send Telegram notification',
        parameters: z.object({}),
      },
      {
        name: 'queued_list',
        description: 'List queued actions',
        parameters: z.object({}),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });

  completion.onFunctionCall('delay_mint', async () => {
    reply.done(
      <BotMessage>
        <DelayMintComponent />
      </BotMessage>
    );
  });

  completion.onFunctionCall('deploy_token', async () => {
    reply.done(
      <BotMessage>
        <DeployComponent />
      </BotMessage>
    );
  });

  completion.onFunctionCall('schedule_newsletter', async () => {
    reply.done(
      <BotMessage>
        <ScheduleNewsletterComponent />
      </BotMessage>
    );
  });

  completion.onFunctionCall('telegram_notify', async () => {
    reply.done(
      <BotMessage>
        <TelegramNotifyComponent />
      </BotMessage>
    );
  });

  completion.onFunctionCall('queued_list', async () => {
    reply.done(
      <BotMessage>
        <QueuedComponent />
      </BotMessage>
    );
  });

  return {
    id: Date.now(),
    display: reply.value,
  };
}
