'use client';

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
import { ActionBody } from '../api/qstash/route';

const formSchema = z.object({
  // prompt: z.string().nonempty({ message: "Required" }),
  address: z.string().min(1, { message: 'Required' }),
  amount: z.string().min(1, { message: 'Required' }),
  delay: z.string().min(1, { message: 'Required' }),
  times: z.string().min(1, { message: 'Required' }),
});

export default function MainForm() {
  const activeAccount = useActiveAccount();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // prompt: "",
      address: '',
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
      amount: values.amount.toString(),
      delay: +delayInSeconds,
      times: +values.times,
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
        title: 'Success',
        description: 'Action succesfully scheduled.',
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
      <div className='flex flex-col items-center justify-between p-24'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Address</FormLabel>
                  <FormControl>
                    <Input placeholder='0x123...' {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder='100' type='number' {...field} />
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
            <FormField
              control={form.control}
              name='times'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Times</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
