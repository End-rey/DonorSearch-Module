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
    navigate('/profile');
  }
  return (
    <>
      <BackButton />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-[100%] space-y-4'
        >
          <h3 className='text-2xl font-medium text-dark'>Подтверждение</h3>
          <FormField
            control={form.control}
            name='pin'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email-код<span className='text-sm text-redMain'>*</span>
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
            <p className='text-center text-sm text-links'>
              Выслать код повторно через {seconds} сек.
            </p>
          ) : (
            <Button
              onClick={() => {
                setSeconds(60);
              }}
              variant='whiteEdition'
              className='w-[100%] bg-transparent text-links'
            >
              Выслать код повторно
            </Button>
          )}
          <Button type='submit' className='w-[100%] bg-redMain'>
            Войти в личный кабинет
          </Button>
        </form>
      </Form>
      <SupportLine />
    </>
  );
};
