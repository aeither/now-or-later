'use client';

type TimeKey = 'morning' | 'afternoon' | 'evening';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { convertToSeconds } from '@/lib/utils/helpers';

const formSchema = z.object({
  // prompt: z.string().nonempty({ message: "Required" }),
  address: z.string().min(1, { message: 'Required' }),
  amount: z.number().min(1, { message: 'Required' }),
  delay: z.string().min(1, { message: 'Required' }),
  times: z.number().min(1, { message: 'Required' }),
});

export default function MainForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // prompt: "",
      address: '',
      amount: 100,
      delay: 'now',
      times: 3,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const delayInSeconds = convertToSeconds(values.delay);

    const combinedValues = { ...values, delay: delayInSeconds };
    console.log(combinedValues);

    // const response = await fetch('/api/schedule', {
    //   method: 'POST',
    //   body: JSON.stringify(combinedValues),
    // });

    // if (response.status === 200) {
    //   toast({
    //     title: 'Success',
    //     description: 'Postcard succesfully scheduled.',
    //   });
    // } else {
    //   toast({
    //     title: 'Uh oh...',
    //     description: 'Something went wrong...',
    //   });
    // }
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
                    <Input placeholder='100' {...field} />
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
                    <Input placeholder='3' {...field} />
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

export const runtime = 'nodejs';
