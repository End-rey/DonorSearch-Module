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

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Поле обязательно к заполнению',
  }),
  password: z.string().min(1, {
    message: 'Поле обязательно к заполнению',
  }),
  username: z.string().min(1, {
    message: 'Поле обязательно к заполнению',
  }),
});
export const RegisterPhone = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '+7',
      password: '',
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 w-[100%]'
        >
          <h3 className='text-2xl font-medium text-dark'>
            Регистрация по номеру телефона
          </h3>
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Номер телефона<span className='text-redMain text-sm'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='Номер телефона с +7'
                    {...field}
                  />
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
                  Пароль<span className='text-redMain text-sm'>*</span>
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Имя пользователя
                  <span className='text-redMain text-sm'>*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder='Имя пользователя' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='bg-redMain w-[100%]'>
            Зарегистрироваться
          </Button>
        </form>
      </Form>
      <SupportLine />
    </>
  );
};
