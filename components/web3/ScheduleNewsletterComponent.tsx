'use client';

import { ActionBody } from '@/app/api/qstash/route';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { convertToSeconds } from '@/lib/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useActiveAccount } from 'thirdweb/react';
import * as z from 'zod';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  // prompt: z.string().nonempty({ message: "Required" }),
  email: z.string().min(1, { message: 'Required' }),
  content: z.string().min(1, { message: 'Required' }),
  address: z.string().min(1, { message: 'Required' }),
  amount: z.string().min(1, { message: 'Required' }),
  delay: z.string().min(1, { message: 'Required' }),
  times: z.string().min(1, { message: 'Required' }),
});

export function ScheduleNewsletterComponent() {
  const activeAccount = useActiveAccount();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // prompt: "",
      email: 'test@mail.com',
      content: 'native coin price',
      address: '0x99160B322E92739f03050cA8BAa32Df658C9e423',
      amount: '100',
      delay: 'now',
      times: '3',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const delayInSeconds = convertToSeconds(values.delay);
    const storedPrivateKey = localStorage.getItem('ai-home-wallet-key');

    if (!activeAccount?.address || !storedPrivateKey) {
      alert('missing values !activeAccount?.address || storedPrivateKey');
      return 'missing values !activeAccount?.address || storedPrivateKey';
    }

    const combinedValues: ActionBody = {
      ...values,
      delay: +delayInSeconds,
      times: 1,
      type: 'email',
      userAddress: activeAccount?.address,
      privateKey: storedPrivateKey,
    };
    console.log(combinedValues);

    const response = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify(combinedValues),
    });

    if (response.status === 200) {
      toast({
        title: 'Action Confirmed',
        description: 'Action has been successfully scheduled.',
      });
    } else {
      toast({
        title: 'Uh oh...',
        description: 'Something went wrong...',
      });
    }
  };

  return (
    <>
      <div className='flex flex-col w-full items-center justify-between'>
        <h1 className='text-4xl font-bold'>Send Newsletter</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Describe the content' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='delay'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When</FormLabel>
                  <FormControl>
                    <Input placeholder='2 minutes' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' type='submit'>
              Schedule
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
