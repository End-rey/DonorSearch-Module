import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine.tsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/Authorization/BackButton/BackButton.tsx';

const formSchema = z.object({
  pin: z.string(),
});

export const RegisterCode = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate('/DonorSearch-Module/profile');
  }
  return (
    <>
      <BackButton />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 w-[100%]'
        >
          <h3 className='text-2xl font-medium text-dark'>Подтверждение</h3>
          <FormField
            control={form.control}
            name='pin'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email-код<span className='text-redMain text-sm'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Код подтверждения'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {seconds !== 0 ? (
            <p className='text-links text-sm text-center'>
              Выслать код повторно через {seconds} сек.
            </p>
          ) : (
            <Button
              onClick={() => {
                setSeconds(60);
              }}
              variant='whiteEdition'
              className='bg-transparent text-links w-[100%]'
            >
              Выслать код повторно
            </Button>
          )}
          <Button type='submit' className='bg-redMain w-[100%]'>
            Войти в личный кабинет
          </Button>
        </form>
      </Form>
      <SupportLine />
    </>
  );
};
