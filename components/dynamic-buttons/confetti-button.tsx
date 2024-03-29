'use client';

import { AI } from '@/app/actions/ai';
import { useUIState } from 'ai/rsc';
import JSConfetti from 'js-confetti';
import { useState } from 'react';
import { useSignMessage } from 'wagmi';
import { BotCard } from '../llm-stocks';
import { Button } from '../ui/button';

export function ConfettiButton() {
  const { signMessage } = useSignMessage();
  const [innerUI, setInnerUI] = useState<null | React.ReactNode>(null);
  const [messages, setMessages] = useUIState<typeof AI>();

  const logMessages = async () => {
    console.log('messages', messages);
  };

  return (
    <>
      <div className='flex gap-3'>
        <Button
          onClick={() => {
            signMessage({ message: 'hello world' });
          }}
        >
          Sign message
        </Button>
      </div>
      <div className='flex gap-3'>
        <Button
          onClick={() => {
            const jsConfetti = new JSConfetti();
            jsConfetti.addConfetti();
          }}
        >
          Confetti!!!
        </Button>

        <Button
          onClick={async () => {
            logMessages();
          }}
        >
          Log messages
        </Button>
      </div>
      <BotCard>BotCard: {innerUI && innerUI}</BotCard>
    </>
  );
}
