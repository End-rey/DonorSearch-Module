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
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SupportLine } from '@/components/Authorization/SupportLine/SupportLine.tsx';
import BackButton from '@/components/Authorization/BackButton/BackButton.tsx';
import { registrationEmail } from '@/api/auth';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Укажите имя',
    })
    .min(1, {
      message: 'Поле обязательно к заполнению',
    }),
  password: z
    .string({
      required_error: 'Пароль должен содержать минимум 8 символов',
    })

    .min(1, {
      message: 'Поле обязательно к заполнению',
    }),
  first_name: z
    .string({
      required_error: 'Поле обязательно к заполнению',
    })
    .min(1, {
      message: 'Поле обязательно к заполнению',
    }),
});
export const RegisterEmail = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      first_name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registrationEmail({ ...values, action: 'register_email' });
  }
  return (
    <>
      <BackButton />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mb-4 w-[100%] space-y-4'
        >
          <h3 className='text-2xl font-medium'>Регистрация по Email</h3>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<span className='text-sm'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Пароль<span className='text-sm text-redMain'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type={'password'} placeholder='Пароль' {...field} />
                </FormControl>
                <FormDescription>
                  Пароль должен содержать минимум 8 символов и состоять из цифр
                  и букв
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Имя
                  <span className='text-sm text-redMain'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Имя' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-[100%]'>
            Зарегистрироваться
          </Button>
        </form>
      </Form>
      <SupportLine />
    </>
  );
};
