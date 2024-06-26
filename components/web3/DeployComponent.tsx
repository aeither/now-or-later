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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  // prompt: z.string().nonempty({ message: "Required" }),
  title: z.string().min(1, { message: 'Required' }),
  address: z.string().min(1, { message: 'Required' }),
  amount: z.string().min(1, { message: 'Required' }),
  delay: z.string().min(1, { message: 'Required' }),
  times: z.string().min(1, { message: 'Required' }),
  chain: z.string().min(1, { message: 'Required' }),
});

export function DeployComponent() {
  const activeAccount = useActiveAccount();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      address: '0x99160B322E92739f03050cA8BAa32Df658C9e423',
      amount: '100',
      delay: 'now',
      times: '1',
      chain: 'neon',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('submitting...');

    const delayInSeconds = convertToSeconds(values.delay);
    const storedPrivateKey = localStorage.getItem('ai-home-wallet-key');

    if (!activeAccount || !activeAccount.address || !storedPrivateKey) {
      alert('wallet not connected or profile not set');
      return 'missing values !activeAccount?.address || storedPrivateKey';
    }

    const combinedValues: ActionBody = {
      ...values,
      delay: +delayInSeconds,
      times: 1,
      type: 'deploy',
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
        <h1 className='text-4xl font-bold'>Deploy Token</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Doggocoin' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
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
            /> */}
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
              name='chain'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chain</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select chain' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='neon'>Neon</SelectItem>
                      <SelectItem value='astar'>Astar</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant='outline' type='submit'>
              Deploy
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
